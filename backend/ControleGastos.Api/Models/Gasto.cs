using System.ComponentModel.DataAnnotations;
namespace ControleGastos.Api.Models;

public class Gasto
{
    public int Id { get; set; }

    [Required(ErrorMessage = "A descrição é obrigatória.")]
    [StringLength(100, ErrorMessage = "A descrição deve ter no máximo 100 caracteres.")]
    public string Descricao { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue, ErrorMessage = "O valor do gasto deve ser maior que zero.")]
    public decimal Valor { get; set; }

    [Required(ErrorMessage = "A categoria é obrigatória.")]
    [StringLength(50, ErrorMessage = "A categoria deve ter no máximo 50 caracteres.")]
    public string Categoria { get; set; } = string.Empty;
    public DateTime Data { get; set; }
}