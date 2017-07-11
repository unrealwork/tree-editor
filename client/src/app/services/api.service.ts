import {Http} from '@angular/http';
import {Node} from '../models/node.model';
import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';
import {Description} from '../models/description.model';

@Injectable()
export class ApiService {
  private nodesUrl = 'api/nodes/';

  constructor(private http: Http) {
  }


  /**
   * Retrieve root node.
   *
   * @returns {Promise<any>} - promise with root node
   */
  public root(): Promise<Node> {
    return this.http.get(`${this.nodesUrl}root`)
    .toPromise()
    .then(response => response.json() as Node)
    .catch(this.handleError);
  }

  /**
   * Retrieve path by specified id.
   *
   * @param id - id.
   * @returns {Promise<any>} - promise with loadedNode
   */
  public path(id: number): Promise<Array<Node>> {
    return this.http.get(`${this.nodesUrl + id}/path`)
    .toPromise()
    .then(response => response.json() as Array<Node>)
    .catch(this.handleError);
  }

  /**
   * Retrieve loadedNode by specified id.
   * @param id - id.
   * @returns {Promise<any>} - promise with loadedNode
   */
  public get(id: number): Promise<Node> {
    return this.http.get(this.nodesUrl + id)
    .toPromise()
    .then(response => response.json() as Node)
    .catch(this.handleError);
  }

  /**
   * Retrieve list of all nodes.
   *
   * @returns {Promise<any>}
   */
  public list(): Promise<Array<Node>> {
    return this.http.get(this.nodesUrl)
    .toPromise()
    .then(response => response.json() as Array<Node>)
    .catch(this.handleError);
  }

  public children(id: number): Promise<Array<Node>> {
    return this.http.get(`${this.nodesUrl + id}/children`)
    .toPromise()
    .then(response => response.json() as Array<Node>)
    .catch(this.handleError);
  }

  public addChild(id: number, content: Description): Promise<Node> {
    return this.http.put(`${this.nodesUrl + id}`, content)
    .toPromise()
    .then(response => response.json() as Node)
    .catch(this.handleError);
  }

  public update(id: number, content: Description): Promise<Node> {
    return this.http.post(`${this.nodesUrl + id}`, content)
    .toPromise()
    .then(response => response.json() as Node)
    .catch(this.handleError);
  }

  public remove(id: number): Promise<Node> {
    return this.http.delete(`${this.nodesUrl + id}`)
    .toPromise()
    .then(response => response.json() as Node)
    .catch(this.handleError);
  }

  public move(id: number, destId: number): Promise<Node> {
    return this.http.get(`${this.nodesUrl + id}/${destId}`)
    .toPromise()
    .then(response => response.json() as Node)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
