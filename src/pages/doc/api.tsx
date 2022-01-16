import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function Swagger(): JSX.Element {
  return <SwaggerUI url="/doc/openapi.json" />;
}
