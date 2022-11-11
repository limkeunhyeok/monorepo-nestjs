import { DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";

export interface ApiDocsOptions {
  title?: string;
  description?: string;
  version?: string;
}

export const getSwaggerConfig = ({
  title = "Main App",
  description = "The Main app API description",
  version = "1.0",
}: ApiDocsOptions = {}): Omit<OpenAPIObject, "paths"> => {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  return config;
};
