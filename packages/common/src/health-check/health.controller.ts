import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly typeorm: TypeOrmHealthIndicator
  ) {}

  @Get("/")
  @HealthCheck()
  serverCheck() {
    return {
      status: "ok",
      info: { "main-server": { status: "up" } },
      error: {},
      details: { "main-server": { status: "up" } },
    };
  }

  @Get("/http")
  @HealthCheck()
  httpCheck() {
    return this.health.check([
      () => this.http.pingCheck("nestjs-docs", "https://docs.nestjs.com"),
    ]);
  }

  @Get("/typeorm")
  @HealthCheck()
  typeormCheck() {
    return this.health.check([() => this.typeorm.pingCheck("database")]);
  }
}
