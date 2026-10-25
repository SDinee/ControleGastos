using System.ComponentModel.DataAnnotations;
namespace ControleGastos.Api.Models;

public class Gasto
{
    public int Id { get; set; }

    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(50, ErrorMessage = "O nome deve ter no máximo 50 caracteres.")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "A descrição é obrigatória.")]
    [StringLength(100, ErrorMessage = "A descrição deve ter no máximo 100 caracteres.")]
    public string Descricao { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue, ErrorMessage = "O valor do gasto deve ser maior que zero.")]
    public decimal Valor { get; set; }

    [Range(
        typeof(DateTime),
        "2000-01-01", 
        "2999-12-31", 
        ErrorMessage = "O vencimento deve estar entre 01/01/2000 e 31/12/2999.")]
    public DateTime Vencimento { get; set; }
}