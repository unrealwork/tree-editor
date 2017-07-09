package com.unrealwork.filemanager.api;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import com.unrealwork.filemanager.Application;
import com.unrealwork.filemanager.models.Description;
import com.unrealwork.filemanager.models.Node;
import com.unrealwork.filemanager.services.NodeService;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.transaction.Transactional;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
public class NodeRestControllerTest {

  private MediaType contentType = new MediaType(APPLICATION_JSON.getType(),
      APPLICATION_JSON.getSubtype(),
      Charset.forName("utf8"));

  private MockMvc mockMvc;

  private HttpMessageConverter mappingJackson2HttpMessageConverter;

  @Autowired
  private NodeService nodeService;

  @Autowired
  private WebApplicationContext webApplicationContext;

  @Autowired
  void setConverters(HttpMessageConverter<?>[] converters) {
    this.mappingJackson2HttpMessageConverter = Arrays.stream(converters)
        .filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter)
        .findAny()
        .orElse(null);

    assertNotNull("the JSON message converter must not be null",
        this.mappingJackson2HttpMessageConverter);
  }

  @Before
  public void setup() throws Exception {
    this.mockMvc = webAppContextSetup(webApplicationContext).build();
    this.nodeService.clear();
  }

  @Test
  public void testGetRoot() throws Exception {
    mockMvc.perform(get("/api/nodes/1"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(contentType))
        .andExpect(jsonPath("$.id", is(1)))
        .andExpect(jsonPath("$.content.name", is("/")));
  }


  @Test
  public void testSubNodeCreation() throws Exception {
    Description description = new Description("a");
    mockMvc.perform(put("/api/nodes/1")
        .contentType(contentType)
        .content(json(description)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.content.name", is(description.getName())));
  }

  @Test
  public void testCreationDuplicateContent() throws Exception {
    Description description = new Description("a");
    nodeService.add(1L, description);
    mockMvc.perform(put("/api/nodes/1")
        .contentType(contentType)
        .content(json(description)))
        .andExpect(status().isBadRequest());
  }

  @Test
  public void testNodeList() throws Exception {
    List<Description> descriptionList = Stream.of("a", "b", "c")
        .map(Description::new)
        .collect(Collectors.toList());

    descriptionList.forEach(content -> nodeService.add(1L, content));
    mockMvc.perform(get("/api/nodes"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(descriptionList.size() + 1)));

  }


  @Test
  @Transactional
  public void testRemoveNode() throws Exception {
    Node node = nodeService.add(1L, new Description("a"));
    nodeService.add(node.getId(), new Description("b"));
    mockMvc.perform(delete(String.format("/api/nodes/%d", node.getId())))
        .andExpect(content().contentType(contentType))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content.name", is("a")));

    assertEquals(1, nodeService.list().size());
    assertEquals(0, nodeService.getChildren(1L).size());
  }

  @Test
  public void testChildrenList() throws Exception {
    List<Description> descriptionList = Stream.of("a", "b", "c")
        .map(Description::new)
        .collect(Collectors.toList());

    descriptionList.forEach(content -> nodeService.add(1L, content));

    mockMvc.perform(get("/api/nodes/1/children"))
        .andExpect(content().contentType(contentType))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(3)));
  }

  @Test
  @Transactional
  public void testMoveNode() throws Exception {
    Node firstChild = nodeService.add(1L, new Description("a"));
    Node secondChild = nodeService.add(1L, new Description("b"));
    nodeService.add(firstChild.getId(), new Description("c"));

    String testUri = String
        .format("/api/nodes/%d/move/%d", firstChild.getId(), secondChild.getId());
    mockMvc
        .perform(get(testUri))
        .andExpect(content().contentType(contentType))
        .andExpect(status().isOk());

    assertEquals(1, nodeService.getOne(1L).getChildren().size());
    assertEquals(nodeService.list().size(), 4);
  }

  @Test
  @Transactional
  public void testUpdate() throws Exception {
    Node node = nodeService.add(1L, new Description("a"));
    String uri = String.format("/api/nodes/%d", node.getId());
    mockMvc.perform(post(uri).
        contentType(APPLICATION_JSON).
        content(json(new Description("b"))))
        .andExpect(status().isOk())
        .andExpect(content().contentType(contentType))
        .andExpect(jsonPath("$.content.name", is("b")));
  }

  @Test
  @Transactional
  public void testRoot() throws Exception {
    String uri = "/api/nodes/root";
    mockMvc.perform(get(uri))
        .andExpect(status().isOk())
        .andExpect(content().contentType(contentType))
        .andExpect(jsonPath("$.content.name", is("/")));
  }


  private <T> String json(T o) throws IOException {
    MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
    this.mappingJackson2HttpMessageConverter.write(
        o, APPLICATION_JSON, mockHttpOutputMessage);
    return mockHttpOutputMessage.getBodyAsString();
  }


}