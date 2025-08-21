import React from 'react';
import styles from "./InterieurSimPage.module.scss";
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  

  return (
    <div  className={styles['interieursim']}>
      <h1>InterieurSim</h1>
      <p>{t(`allProjects.1.description`, {ns:"projects"})}</p>
      <p>Het project was een opdracht voor het vak Programmeren Gevorderd 3 in mijn studies. Hiervoor moest de applicatie aan heel wat voorwaarden voldoen die we nu zullen bespreken.</p>
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
      <h2>Identity Server (OAuth)</h2>
      <p>We authoriseren Postman en onze WebappAuth applicatie om de product api en position api te gebruiken zodat onze producten niet in gelijk welke app van derden gebruikt kan worden.</p>
      <p className={styles['code-description']}>ProductController.cs van Product.Api</p>
      <SyntaxHighlighter language="csharp" style={darkMode? oneDark : materialLight} customStyle={{ borderRadius: "8px", fontSize: "1em" }}>
        {codeAuthorizeProductApi}
      </SyntaxHighlighter>
    </div>
    
  )
}

export default InterieurSimPage