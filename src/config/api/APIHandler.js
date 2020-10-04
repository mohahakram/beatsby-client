import axios from "axios";


class APIHandler {
  constructor() {
    let backend_uri = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_URL : "http://localhost:4001" ;
    let auth = localStorage.getItem("user_auth");
    let token = JSON.parse(auth);
    console.log(token);


    this.name = "APIHandler";
    if (!backend_uri)
      throw new Error("A target backend URL must be specified in .env");
    this.api = axios.create({
      baseURL: `${backend_uri}`,
      // withCredentials: infos && infos.credentials ? true : false
      withCredentials: true,
      headers: {
        Authorization: "Bearer" + " " + token.user.jwt
      }
    });
    // this.api.interceptors.response.use(function (response) {
    //   // Any status code that lie within the range of 2xx cause this function to trigger
    //   // Do something with response data
    //   console.log("intercepted response")
    //   console.log(response)
    //   return response;
    // }, function (error) {
    //   // Any status codes that falls outside the range of 2xx cause this function to trigger
    //   // Do something with response error
    //   console.log(error)
    //   return Promise.reject(error);
    // });
  }

  checkRoute(route, config) {
    try {
      if (!route) throw new Error("please provide the requested server route");
      if (config && typeof config !== "object")
        throw new Error("Config must be an object");
    } catch (err) {
      return console.error(err);
    }
  }

  post(route, payload, config) {
    this.checkRoute(route, config);
    if (payload && typeof payload !== "object")
      throw new Error(
        `${this.name} post() function expects payload argument to be of type Object`
      );
      // console.log(payload)
    return this.api.post(route, payload, config);
  }

  get(route, query, config) {
    this.checkRoute(route, config);
    var queryString = "";
    if (query) {
      if (typeof query !== "object")
        throw new Error(
          `${this.name} get() function expects query argument to be of type Object`
        );
      let count = 0;
      let keyCount = Object.keys(query);
      for (let key in query) {
        if (!count) queryString += "?";
        if (count && count < keyCount) queryString += "&";
        queryString += `${key}=${query[key]}`;
        count++;
      }
    }

    return this.api.get(route + (queryString || ""), config);
  }

  patch(route, payload, config) {
    this.checkRoute(route, config);
    if (!payload || typeof payload !== "object")
      throw new Error(
        `${this.name} patch() function expects payload argument to be of type Object`
      );
    return this.api.patch(route, payload, config);
  }

  replace(route, payload, config) {
    this.checkRoute(route, config);
    if (!payload || typeof payload !== "object")
      throw new Error(
        `${this.name} replace() function expects payload argument to be of type Object`
      );
    return this.api.put(route, payload, config);
  }

  delete(route, id, config) {
    this.checkRoute(route, config);
    if (!id)
      throw new Error(
        `${this.name} delete() function expects the id of the ressource targeted for deletion`
      );
    return this.api.delete(`${route}/${id}`);
  }
}

export default new APIHandler();
