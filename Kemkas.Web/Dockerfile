FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install --global yarn \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src
COPY ["Kemkas.Web/Kemkas.Web.csproj", "Kemkas.Web/"]
RUN dotnet restore "Kemkas.Web/Kemkas.Web.csproj"
COPY . .
WORKDIR "/src/Kemkas.Web"
RUN dotnet build "Kemkas.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Kemkas.Web.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Kemkas.Web.dll"]
