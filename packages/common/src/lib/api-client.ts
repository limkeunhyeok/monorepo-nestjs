import { ServiceUnavailableException } from "@nestjs/common";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from "axios";
import { winstonLogger } from "./logger";

export interface ApiClientOptions {
  baseUrl: string;
  headers?: Record<string, string>;
  maxBodyLength?: number;
  timeoutMs: number;
}

export class ApiClient {
  private readonly instance: AxiosInstance;

  constructor(private options: ApiClientOptions) {
    if (!this.options.headers) {
      this.options.headers = {};
    }

    const maxBodyLength = options.maxBodyLength || 1 * 1024 * 1024;

    this.instance = axios.create({
      baseURL: this.options.baseUrl,
      timeout: this.options.timeoutMs,
      headers: this.options.headers,
      maxBodyLength,
      maxContentLength: maxBodyLength,
    });

    this.instance.interceptors.request.use(requestHandler, apiErrorHandler);

    this.instance.interceptors.response.use(responseHandler, apiErrorHandler);
  }

  private async requestWithQuery<ReqType, ResType>(options: {
    path: string;
    method: "get" | "delete";
    headers?: Record<string, string>;
    query?: ReqType;
  }): Promise<ResType> {
    const response = await this.instance[options.method]<ReqType, ResType>(
      options.path,
      {
        params: options.query,
        headers: {
          ...this.options.headers,
          ...options.headers,
        },
      }
    );

    return <ResType>response["data"];
  }

  private async requestWithBody<ReqType, ResType>(options: {
    path: string;
    method: "post" | "put";
    headers?: Record<string, string>;
    body?: ReqType;
  }): Promise<ResType> {
    const response = await this.instance[options.method]<ReqType, ResType>(
      options.path,
      options.body,
      {
        headers: {
          ...this.options.headers,
          ...options.headers,
        },
      }
    );

    return <ResType>response["data"];
  }

  async getJson<ReqType, ResType>(options: {
    path: string;
    headers?: Record<string, string>;
    query?: ReqType;
  }): Promise<ResType> {
    return this.requestWithQuery<ReqType, ResType>({
      method: "get",
      headers: {
        ...options.headers,
        Accepts: "application/json",
      },
      path: options.path,
      query: options.query,
    });
  }

  async deleteJson<ReqType, ResType>(options: {
    path: string;
    headers?: Record<string, string>;
    query?: ReqType;
  }): Promise<ResType> {
    return this.requestWithQuery<ReqType, ResType>({
      method: "delete",
      headers: {
        ...options.headers,
        Accepts: "application/json",
      },
      path: options.path,
      query: options.query,
    });
  }

  async postJson<ReqType, ResType>(options: {
    path: string;
    headers?: Record<string, string>;
    body?: ReqType;
  }): Promise<ResType> {
    return this.requestWithBody<ReqType, ResType>({
      method: "post",
      headers: {
        ...options.headers,
        Accepts: "application/json",
      },
      path: options.path,
      body: options.body,
    });
  }

  async putJson<ReqType, ResType>(options: {
    path: string;
    headers?: Record<string, string>;
    body?: ReqType;
  }): Promise<ResType> {
    return this.requestWithBody<ReqType, ResType>({
      method: "put",
      headers: {
        ...options.headers,
        Accepts: "application/json",
      },
      path: options.path,
      body: options.body,
    });
  }
}

const requestHandler = (config: AxiosRequestConfig) => {
  const { method, baseURL, url, data, params } = config;
  const withData = data || params;

  winstonLogger.debug({
    message: `${method.toUpperCase()} To ${baseURL}${url} with ${JSON.stringify(
      withData
    )}`,
  });
  return config;
};

const responseHandler = (value: AxiosResponse) => {
  const { config, data } = value;
  const { baseURL, url } = config;

  winstonLogger.debug({
    message: `FROM ${baseURL}${url} with ${JSON.stringify(data)}`,
  });
  return value;
};

const apiErrorHandler = (error: AxiosError) => {
  const { message, name, stack } = error;
  winstonLogger.error({ message });

  if (isAxiosError(error)) {
    throw new ServiceUnavailableException({ name, message, stack });
  }

  throw error;
};
