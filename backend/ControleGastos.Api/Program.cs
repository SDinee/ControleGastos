using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddDbContext<ControleGastosContext>(options =>
{
    options.UseSqlite("Data Source=Data/Banco/gastos.db");
});

var app = builder.Build();

app.MapGet("/api/gastos", (ControleGastosContext context) =>
{
    return context.Gastos.ToList();
});

app.MapPost("/api/gastos", (Gasto gasto, ControleGastosContext context) =>
{
    context.Gastos.Add(gasto);
    context.SaveChanges();

    return Results.Created($"/api/gastos/{gasto.Id}", gasto);
});

app.MapDelete("/api/gastos/{Id}", (int Id, ControleGastosContext context) =>
{
    var gasto = context.Gastos.Find(Id);
    if (gasto == null)
    {
        return Results.NotFound();
    }

    context.Gastos.Remove(gasto);
    context.SaveChanges();

    return Results.NoContent();
});

app.MapPut("/api/gastos/{Id}", (
    int Id,
    Gasto gastoAtualizado,
    ControleGastosContext context) =>
{
    var gasto = context.Gastos.Find(Id);
    if (gasto == null)
    {
        return Results.NotFound();
    }

    gasto.Descricao = gastoAtualizado.Descricao;
    gasto.Valor = gastoAtualizado.Valor;
    gasto.Categoria = gastoAtualizado.Categoria;
    gasto.Data = gastoAtualizado.Data;

    context.SaveChanges();

    return Results.NoContent();
});

app.Run();