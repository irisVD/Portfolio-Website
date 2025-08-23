import React from 'react';
import styles from "./InterieurSimPage.module.scss";
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactPlayer from 'react-player';
import interieurSimvideo from "../../public/videos/video-interieursim.mp4";

const InterieurSimPage = () => {
  const {t} = useTranslation(["global", "projects", "skills"]);
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
      <p>Het project was een opdracht voor het vak Programmeren Gevorderd 3 in mijn studies. Hiervoor moest de applicatie aan heel wat voorwaarden voldoen die we nu zullen bespreken.</p>
      <p>Het frontend is in actieve ontwikkeling. (Video van vooruitgang op het einde van de pagina.)</p>

      <h2>Volledig historiek in versiebeheer via Devops</h2>
      <img src="../../public/devops-backlog.png" alt="Devops backlog" />
      <p className={styles['image-description']}>Devops backlog</p>
      <img src="../../public/devops-commits.png" alt="Devops commits" />
      <p className={styles['image-description']}>Devops commits</p>
      <h2>Poduct Api</h2>
      <p>Communicatie tussen web services</p>
      <img src="../../public/interieursim-systeem.png" alt="InterieurSim schema" />
      <p className={styles['image-description']}>InterieurSim schema</p>
      <p>We starten de ontwikkeling van InterieurSim met een cloud based Product Api die zijn gegevens opslaat in een Azure Cosmos database. We kiezen hier voor een Cosmos database omdat dit een NoSQL database is die het systeem toelaat om bij veel instanties van producten snel de data voor een product laat opzoeken. De producten hebben geen onderlingen relaties. Bij onze applicatie kan de gebruiker uit een catalogus van duizenden producten zoeken voor het indelen van zijn interieur waarbij de producten zijn posities in de kamer krijgen. De verhouding tussen producten en posities is énorm groot, dus een relationele databank is een slecht idee.</p>
      <p>Hieronder zien we de POST methode die de gegevens naar de server stuurt.</p>
      <p className={styles['code-description']}>ProductController.cs van Product.Api</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductControllerCreateAsync}
      </SyntaxHighlighter>
      <p>Vervolgens worden deze gegevens doorgestuurd en verwerkt door de ProductService.</p>
      <p className={styles['code-description']}>ProductController.cs van Product.Service</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductServiceCreateAsync}
      </SyntaxHighlighter>
      <p>Via de repository opgeslagen in de Cosmos db.</p>
      <p className={styles['code-description']}>ProductRepository.cs van Product.Storage</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductRepositoryCreateAsync}
      </SyntaxHighlighter>
      <p>Position Api wordt op een equivalente manier opgesteld.</p>
      <h2>DTOs</h2>
      <p>Om duidelijk af te bakenen welke informatie de client ingeeft om een Product op te stellen en welke info de server uiteindelijk opslaat schrijven we hiervoor een contract neer om deze vereisten op te lijsten. (+ een contract om te registreren welke gegevens de server naar de client terug zendt)</p>
      <p> (Eveneens een contract om te registreren welke gegevens de server naar de client terug zendt.)</p>
      <img src="../../public/DTOs.png" alt="Product contracten/DTOs" />
      <p></p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductResponseContract}
      </SyntaxHighlighter>
      <h2>Blob storage</h2>
      <p>De Cosmos product data heeft zijn bijhorde product afbeelding. Deze wordt in een Azure blob storage opgeslagen.</p>
      <p className={styles['code-description']}>ProductImgRepository.cs van ProductImg.Storage</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductImgRepository}
      </SyntaxHighlighter>

      <h2>Identity Server (OAuth) (mbv Duende.IdentityServer.Templates NuGet package)</h2>
      <p>We authoriseren en authenticeren Postman om de product api en position api te gebruiken zodat onze producten niet in gelijk welke app van derden gebruikt kan worden.</p>
      <p className={styles['code-description']}>ProductController.cs van Product.Api</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeAuthorizeProductApi}
      </SyntaxHighlighter>
      <p>Opstarten van IdentityServer</p>
      <p className={styles['code-description']}>Program.cs van IdentityServer</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerProgram}
      </SyntaxHighlighter>
      <p>Met zijn configuratie van build services en app pipeline die uitgevoerd worden wanneer de Identity Server opstart.</p>
      <p className={styles['code-description']}>HostingExtensions.cs van IdentityServer</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerHostingExtensions}
      </SyntaxHighlighter>
      <p>En de configuratie van de app clients. Deze app clients zijn programma's waarbij we hier configureren tot welke api scopes deze toegang krijgen. Voor het moment geven we enkel Postman volledige toegang tot de apis mits de juiste Bearer token geauthoriseerd is.</p>
      <p className={styles['code-description']}>HostingExtensions.cs van IdentityServer</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerConfig}
      </SyntaxHighlighter>
      <p className={styles['code-description']}>Program.cs Product.Api</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerProductApi}
      </SyntaxHighlighter>

      <h2>WebApp authoriseren en Identity Server</h2>
      <p>We voegen vervolgens gebruikers toe om via een url en de Webappauthorisatie app in te loggen om toegang te krijgen tot de apis.</p>
      <p>We maken Identity resources aan die zorgen voor unieke profielen met een uniek id</p>
      <p className={styles['code-description']}>config.cs van IdentityServer</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerConfigIdentityResources}
      </SyntaxHighlighter>
      <p>Vervolgens voegen we een app client toe voor de WebappAuth app</p>
      <p className={styles['code-description']}>config.cs van IdentityServer</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerAppAuthClient}
      </SyntaxHighlighter>
      <p>We koppelen de user database met Identity Server voor authenticatie via het Entity Framework. We gebruiken een eevoudige UserDbContext die zijn nodige methodes erft van IdentityDbContext (NuGet package Microsoft.AspNetCore.Identity.EntityFrameworkCore) </p>
      <p className={styles['code-description']}>code in methode configureServices in HostingExtensions.cs van IdentityServer</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerConfigureServicesAddUsers}
      </SyntaxHighlighter>
      <p className={styles['code-description']}>Nieuwe methode InitializeDatabase in HostingExtensions.cs van IdentityServer die word opgeroepen in de configuratie van de app pipeline</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeIdentityServerInitializeDatabase}
      </SyntaxHighlighter>
      <p>Verder werden er nog cookies ingesteld die de gebruiker in gelogd houden en werd een Frontend React applicatie toegevoegd die de WebappAuth app oproepen om in te loggen. Dit valt buiten de scope van wat ik hier uitleg.</p>

      <h2>Throttling</h2>
      <p>We willen throttling/rate limiting toevoegen zodat teveel gebruikers het systeem niet overladen. We stellen voor dit voorbeeld in dat er elke 10 seconden 100 requests kunnen uitgevoerd worden.</p>
      <p className={styles['code-description']}>Program.cs in Product.Api</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductApiThrottlingProgram1}
      </SyntaxHighlighter>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductApiThrottlingProgram2}
      </SyntaxHighlighter>
      <p className={styles['code-description']}>ProductController.cs in Product.Api</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeProductApiThrottlingProductController}
      </SyntaxHighlighter>

      <h2>What's next?</h2>
      <p>Momenteel zit ik in het proces van de frontend applicatie toe te voegen.</p>

      <h2>Video</h2>
      <ReactPlayer src={interieurSimvideo} controls width="100%" height="100%" />
    </div>
  )
}

export default InterieurSimPage