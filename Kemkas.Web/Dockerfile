FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Kemkas.Web/Kemkas.Web.csproj", "Kemkas.Web/"]
RUN dotnet restore "Kemkas.Web/Kemkas.Web.csproj"
COPY . .
WORKDIR "/src/Kemkas.Web"
RUN dotnet build "Kemkas.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Kemkas.Web.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM node:21.4-bookworm AS frontend
WORKDIR /src
COPY ["Kemkas.Web/frontend/package.json", "Kemkas.Web/frontend/yarn.lock", "./"]
RUN yarn install --frozen-lockfile
COPY ["Kemkas.Web/frontend/", "./"]
RUN bash compile-less.sh
RUN yarn run build

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=frontend /src/build ./wwwroot
ENTRYPOINT ["dotnet", "Kemkas.Web.dll"]
