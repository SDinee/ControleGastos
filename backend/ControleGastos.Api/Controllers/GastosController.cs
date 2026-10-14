using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GastosController : ControllerBase
{
    private readonly ControleGastosContext _context;

    public GastosController(ControleGastosContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Listar()
    {
        var gastos = _context.Gastos.ToList();
        return Ok(gastos);
    }

    [HttpPost]
    public IActionResult Criar(Gasto gasto)
    {
        _context.Gastos.Add(gasto);
        _context.SaveChanges();

        return Created($"/api/gastos/{gasto.Id}", gasto);
    }

    [HttpPut("{id}")]
    public IActionResult Atualizar(int id, Gasto gastoAtualizado)
    {
        var gasto = _context.Gastos.Find(id);
        if (gasto == null)
        {
            return NotFound();
        }

        gasto.Descricao = gastoAtualizado.Descricao;
        gasto.Valor = gastoAtualizado.Valor;
        gasto.Nome = gastoAtualizado.Nome;
        gasto.Vencimento = gastoAtualizado.Vencimento;

        _context.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Excluir(int id)
    {
        var gasto = _context.Gastos.Find(id);
        if (gasto == null)
        {
            return NotFound();
        }

        _context.Gastos.Remove(gasto);
        _context.SaveChanges();

        return NoContent();
    }
}