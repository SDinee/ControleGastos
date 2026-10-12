namespace ControleGastos.Api.Models;

public class Gasto
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public string Categoria { get; set; } = string.Empty;
    public DateTime Data { get; set; }
}