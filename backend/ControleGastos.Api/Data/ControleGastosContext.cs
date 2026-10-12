using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Data;

public class ControleGastosContext : DbContext
{
    public ControleGastosContext(DbContextOptions<ControleGastosContext> options) : base(options)
    {
    }

    public DbSet<Gasto> Gastos { get; set; }
}