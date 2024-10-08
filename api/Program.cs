var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors((options) => {
    options.AddPolicy("DevCors", (corsBuilder) => {
        corsBuilder.WithOrigins("http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
        });
    options.AddPolicy("ProdCors", (corsBuilder) => {
        corsBuilder.WithOrigins("https://prodSite.com")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
        });
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
  Console.WriteLine("DEVELOPMENT MODE!");
  app.UseCors("DevCors");
  app.UseSwagger();
  app.UseSwaggerUI();
} else {
  app.UseCors("ProdCors");
  app.UseHttpsRedirection();
}

app.MapControllers();
app.Run();

