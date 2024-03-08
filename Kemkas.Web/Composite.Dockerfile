FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

ARG FE_TAG=latest
ARG BE_TAG=latest

FROM ghcr.io/morbalint/kemkas-fe:$FE_TAG as frontend
FROM ghcr.io/morbalint/kemkas-be:$BE_TAG as backend

FROM base AS final
COPY --from=backend /app .
COPY --from=frontend /usr/share/nginx/html ./wwwroot
ENTRYPOINT ["dotnet", "Kemkas.Web.dll"]
