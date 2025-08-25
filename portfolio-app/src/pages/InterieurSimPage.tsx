import styles from "./InterieurSimPage.module.scss";
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactPlayer from 'react-player';
import interieurSimvideo from "../../public/videos/video-interieursim.mp4";

const InterieurSimPage = () => {
  const {t} = useTranslation(["global", "projects", "interieursim"]);
  const { darkMode } = useOutletContext<{ darkMode: boolean }>() || {};

  const codeProductControllerCreateAsync = 
    `[HttpPost]
      public async Task<ActionResult<ProductResponseContract>> CreateProductAsync(
        [FromBody] ProductRequestContract productRequestContract,
      {
        var result = await productService.CreateProductAsync(productRequestContract);

        return CreatedAtAction(nameof(GetProductAsync), new { id = result.Id }, result);
      }`;

  const codeProductServiceCreateAsync = 
  `public async Task<ProductResponseContract> CreateProductAsync(ProductRequestContract productRequestContract)
    {
        var productModel = ProductMappingExtensions.AsModel(productRequestContract);

        // write product data to db
        productModel.Id = Guid.NewGuid().ToString();
        ProductStorageContract createdProduct = await productRepository.CreateAsync(
          ProductMappingExtensions.AsStorageContract(productModel));

        // return api contract
        return ProductMappingExtensions.AsResponseContract(ProductMappingExtensions.AsModel(createdProduct));
    }`;

    const codeProductRepositoryCreateAsync = 
    `public async Task<ProductStorageContract> CreateAsync(ProductStorageContract productStorageContract)
      {
          var itemResponse = GetCosmosContainer().CreateItemAsync(
              item: productStorageContract,
              partitionKey: new PartitionKey(productStorageContract.id)
          );
          return (await itemResponse).Resource;
      }`;

    const codeProductResponseContract = 
    `public record ProductResponseContract
    (
        string Id,
        string Name,
        string Description,
        string ImageFront,
        string ImageBack,
        string ImageLeft,
        string ImageRight,
        double Price,
        CategoryEnum Category,
        ColorEnum Color
    );`;
  
    const codeProductImgRepository = 
    `public class ProductImgRepository(IOptions<ProductImgRepositoryOptions> options) : IProductImgRepository
    {
        public async Task<byte[]> ReadAsync(string fileName)
        {
            var blob = GetBlobClient(fileName);
            var content = await blob.DownloadContentAsync();
            return content.Value.Content.ToArray();
        }

        public async Task WriteAsync(byte[] imageBytes, string fileName)
        {
            var blob = GetBlobClient(fileName);
            
            using var stream = new MemoryStream(imageBytes);
            // MemoryStream creates a stream but uses a lot of memory
            // using: because it cleans itself up after use to not keep the memory in use
            await blob.UploadAsync(stream, overwrite: true);
        }
    }`;

    const codeAuthorizeProductApi = `[Route("api/products")]
    [Authorize] // to authorize
    [ApiController]
    public class ProductController(IProductService productService) : ControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductResponseContract>> GetProductAsync([FromRoute] string id)
        {
            var result = await productService.GetProductAsync(id);

            if (result == null)
            {
                return NotFound($"No product found with Id {id}");
            }
            return Ok(result);
        }
    }`;
    
    const codeIdentityServerProgram = 
    `// logging
    Log.Logger = new LoggerConfiguration()
        .WriteTo.Console()
        .CreateBootstrapLogger();

    Log.Information("Starting up");

    try
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Host.UseSerilog((ctx, lc) => lc
            .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}")
            .Enrich.FromLogContext()
            .ReadFrom.Configuration(ctx.Configuration));

        var app = builder
            .ConfigureServices()
            .ConfigurePipeline();
        
        app.Run();
    }
    catch (Exception ex)
    {
        Log.Fatal(ex, "Unhandled exception");
    }
    finally
    {
        Log.Information("Shut down complete");
        Log.CloseAndFlush();
`;
  
const codeIdentityServerHostingExtensions =
`public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
        // uncomment if you want to add a UI
        builder.Services.AddRazorPages();

        builder.Services.AddIdentityServer(options =>
            {
                options.EmitStaticAudienceClaim = true;
            });

        builder.Services.AddAuthentication()
            .AddJwtBearer(options => 
            {
                options.Authority = "https://localhost:5001"; 
                options.TokenValidationParameters.ValidateAudience = false; 
            });
        builder.Services.AddAuthorization();

        return builder.Build();
    }
    
    public static WebApplication ConfigurePipeline(this WebApplication app)
    { 
        app.UseSerilogRequestLogging();
    
        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        // uncomment if you want to add a UI
        app.UseStaticFiles();
        app.UseRouting();
            
        app.UseIdentityServer();

        // uncomment if you want to add a UI
        app.UseAuthorization();
        app.MapRazorPages().RequireAuthorization();

        return app;
    }`; 

    const codeIdentityServerProductApi =
    `// Add Authentication and Authorization
    builder.Services.AddAuthentication()
        .AddJwtBearer(options =>
        {
            options.Authority = "https://localhost:5001";
            options.TokenValidationParameters.ValidateAudience = false;
        });
    builder.Services.AddAuthorization();`;

    const codeIdentityServerConfig =
    `public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
            {
                new ApiScope(
                    name: "interieursim.positions.api",
                    displayName: "InterieurSim Positions Api Access"),
                new ApiScope(
                    name: "interieursim.products.api",
                    displayName: "InterieurSim Products Api Access")
            };

    public static IEnumerable<Client> Clients =>
        new Client[]
            { 
                new Client{
                    ClientId = "postman-client",
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets = { new Secret("eenGroterGeheim".Sha256())},
                    AllowedScopes = { "interieursim.positions.api", "interieursim.products.api" }
                }
            };`;

    const codeIdentityServerConfigureServicesAddUsers =
    `var connectionString = builder.Configuration.GetConnectionString("ISSqlServer");

        // connect with database to add the dbcontext for our custom InterieurSimUser
        builder.Services.AddDbContext<UserDbContext>(options => 
            options.UseSqlServer(
                connectionString,
                sql => sql.MigrationsAssembly(
                    typeof(Program).Assembly.GetName().Name)
                        .MigrationsHistoryTable(
                            "__MyMigrationsHistory",
                            "pg3usersinterieursim")));

        builder.Services.AddIdentity<InterieurSimUser, IdentityRole>() 
            .AddEntityFrameworkStores<UserDbContext>()
            .AddDefaultTokenProviders();

        // connect with database
        builder.Services.AddIdentityServer(options =>
            {
                options.EmitStaticAudienceClaim = true;
            })
            .AddConfigurationStore(options =>
            {
                options.DefaultSchema = "pg3isinterieursim";
                options.ConfigureDbContext = b =>
                b.UseSqlServer(
                    connectionString,
                    sql => sql.MigrationsAssembly(
                        typeof(Program).Assembly.GetName().Name)
                            .MigrationsHistoryTable(
                                "__MyMigrationsHistory",
                                "pg3isinterieursim"));
            })
            .AddAspNetIdentity<InterieurSimUser>();`;

    const codeIdentityServerInitializeDatabase =
    `private static void InitializeDatabase(IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices
            .GetService<IServiceScopeFactory>()!.CreateScope(); // uit applicatie creatie wordt de juiste service uitgehaald
        var context = serviceScope.ServiceProvider
            .GetRequiredService<ConfigurationDbContext>(); // en DbContext van IdentityServer toevoegen

        if (!context.Clients.Any())
        {
            foreach (var client in Config.Clients)
                context.Clients.Add(client.ToEntity());
            context.SaveChanges();
        }

        if (!context.IdentityResources.Any())
        {
            foreach (var resource in Config.IdentityResources)
                context.IdentityResources.Add(resource.ToEntity());
            context.SaveChanges();
        }

        if (!context.ApiScopes.Any())
        {
            foreach (var resource in Config.ApiScopes)
                context.ApiScopes.Add(resource.ToEntity());
            context.SaveChanges();
        }
    }`;

    const codeIdentityServerConfigIdentityResources =
    `public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile()
        };`;

    const codeIdentityServerAppAuthClient =
    `new Client {
                    ClientId = "webapp-client",
                    ClientSecrets = {new Secret("eenNogGroterGeheim".Sha256())},
                    AllowedGrantTypes = GrantTypes.Code,
                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                    },
                    RedirectUris = { "https://localhost:7049/signin-oidc" },
                    PostLogoutRedirectUris = { "https://localhost:7049/signout-callback-oidc" },
                }`;

    const codeProductApiThrottlingProgram1 =
    `builder.Services.AddRateLimiter(_ => _.AddFixedWindowLimiter(policyName: "product-limiter", options =>
    {
        options.PermitLimit = 75;
        options.Window = TimeSpan.FromSeconds(10);
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        options.QueueLimit = 10;
    }));`;

    const codeProductApiThrottlingProgram2 =
    `app.UseRateLimiter();`;

    const codeProductApiThrottlingProductController =
    `[HttpGet("{id}")]
        [EnableRateLimiting("product-limiter")] // add throttling to api method
        public async Task<ActionResult<ProductResponseContract>> GetProductAsync([FromRoute] string id)
        {
            var result = await productService.GetProductAsync(id);

            if (result == null)
            {
                return NotFound($"No product found with Id {id}");
            }
            return Ok(result);
        }`;

  return (
    <div  className={styles['interieursim']}>
      <h1>InterieurSim</h1>
      <p>{t(`allProjects.1.description`, {ns:"projects"})}</p>
      <p>{t("progGevorderd3", {ns:"interieursim"})}</p>
      <p>{t("frontendOntwikkeling", {ns:"interieursim"})}</p>

      <h2>{t("h2HistoriekDevops", {ns:"interieursim"})}</h2>
      <img src="../../public/devops-backlog.png" alt={t("imgDevops", {ns:"interieursim"})} />
      <p className={styles['image-description']}>{t("imgDevops", {ns:"interieursim"})}</p>
      <img src="../../public/devops-commits.png" alt={t("imgDevopsCommits", {ns:"interieursim"})} />
      <p className={styles['image-description']}>{t("imgDevopsCommits", {ns:"interieursim"})}</p>

      <h2>Product Api</h2>
      <p>{t("communicationWebServ", {ns:"interieursim"})}</p>
      <img src="../../public/interieursim-systeem.png" alt={t("imgAppArchitecture", {ns:"interieursim"})} />
      <p className={styles['image-description']}>{t("imgAppArchitecture", {ns:"interieursim"})}</p>
      <p>{t("cosmosDb", {ns:"interieursim"})}</p>
      <p>{t("postMethod", {ns:"interieursim"})}</p>
      <p className={styles['code-description']}>{t("productController", {ns:"interieursim"})}</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductControllerCreateAsync}
      </SyntaxHighlighter>
      <p>{t("productService", {ns:"interieursim"})}</p>
      <p className={styles['code-description']}>{t("productServiceCodeDescr", {ns:"interieursim"})}</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductServiceCreateAsync}
      </SyntaxHighlighter>
      <p>{t("productRepo", {ns:"interieursim"})}</p>
      <p className={styles['code-description']}>{t("productRepoCodeDescr", {ns:"interieursim"})}</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductRepositoryCreateAsync}
      </SyntaxHighlighter>
      <p>{t("positionApi", {ns:"interieursim"})}</p>
      <h2>DTOs</h2>
      <p>{t("dtos", {ns:"interieursim"})}</p>
      <p>{t("responseContract", {ns:"interieursim"})}</p>
      <img src="../../public/DTOs.png" alt={t("imgDtos", {ns:"interieursim"})} />
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductResponseContract}
      </SyntaxHighlighter>

      <h2>{t("h2BlobStorage", {ns:"interieursim"})}</h2>
      <p>{t("productBlobImg", {ns:"interieursim"})}</p>
      <p className={styles['code-description']}>{t("productImgRepoCodeDescr", {ns:"interieursim"})}</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductImgRepository}
      </SyntaxHighlighter>

      <h2>{t("h2IdentityServer", {ns:"interieursim"})}</h2>
      <p>{t("authPostmanDuende", {ns:"interieursim"})}</p>
      <p className={styles['code-description']}>{t("productControllerAuth", {ns:"interieursim"})}</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeAuthorizeProductApi}
      </SyntaxHighlighter>
      <p>{t("identityServerBackendServer", {ns:"interieursim"})}</p>
      <p>{t("startingServer", {ns:"interieursim"})}</p>
      <p className={styles['code-description']}>Program.cs van IdentityServer</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerProgram}
      </SyntaxHighlighter>
      <p>{t("buildServicesAppPipeline", {ns:"interieursim"})}</p>
      <p>{t("jwtTokens", {ns:"interieursim"})}</p>
      <p className={styles['code-description']}>{t("hostingExtensions", {ns:"interieursim"})}</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerHostingExtensions}
      </SyntaxHighlighter>
      <p>{t("appClients", {ns:"interieursim"})}</p>
      <p className={styles['code-description']}>{t("configIdentityServ", {ns:"interieursim"})}</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerConfig}
      </SyntaxHighlighter>
      <p className={styles['code-description']}>{t("programProduct", {ns:"interieursim"})}</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerProductApi}
      </SyntaxHighlighter>

      <h2>{t("h2AuthWebApp", {ns:"interieursim"})}</h2>
      <p>{t("addUniqueUsers", {ns:"interieursim"})}</p>
      <p>{t("identityResources", {ns:"interieursim"})}</p>
      <p className={styles['code-description']}>{t("configIdentityServIdentityResources", {ns:"interieursim"})}</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerConfigIdentityResources}
      </SyntaxHighlighter>
      <p>{t("appClientWebappAuth", {ns:"interieursim"})}</p>
      <p className={styles['code-description']}>{t("configWebAppAuth", {ns:"interieursim"})}</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerAppAuthClient}
      </SyntaxHighlighter>
      <p>{t("entityFramework", {ns:"interieursim"})}</p>
      <p className={styles['code-description']}>{t("entityFrameworkConfigureServices", {ns:"interieursim"})}</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerConfigureServicesAddUsers}
      </SyntaxHighlighter>
      <p className={styles['code-description']}>{t("initializeDatabase", {ns:"interieursim"})}</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerInitializeDatabase}
      </SyntaxHighlighter>
      <p>{t("cookies", {ns:"interieursim"})}</p>

      <h2>{t("h2Throttling", {ns:"interieursim"})}</h2>
      <p>{t("limitRequests", {ns:"interieursim"})}</p>
      <p className={styles['code-description']}>{t("throttlingProgramProduct", {ns:"interieursim"})}</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductApiThrottlingProgram1}
      </SyntaxHighlighter>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductApiThrottlingProgram2}
      </SyntaxHighlighter>
      <p className={styles['code-description']}>{t("throttlingProductController", {ns:"interieursim"})}</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductApiThrottlingProductController}
      </SyntaxHighlighter>

      <h2>{t("h2Whatsnext", {ns:"interieursim"})}</h2>
      <p>{t("whatsnextAddFrontend", {ns:"interieursim"})}</p>

      <h2>{t("h2Video", {ns:"interieursim"})}</h2>
      <ReactPlayer className={styles['videoplayer']} src={interieurSimvideo} controls width="100%" height="100%" />
    </div>
  )
}

export default InterieurSimPage