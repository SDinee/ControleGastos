using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleGastos.Api.Migrations
{
    /// <inheritdoc />
    public partial class AtualizaValidacoesGasto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Categoria",
                table: "Gastos");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Gastos",
                newName: "Vencimento");

            migrationBuilder.AddColumn<string>(
                name: "Nome",
                table: "Gastos",
                type: "TEXT",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nome",
                table: "Gastos");

            migrationBuilder.RenameColumn(
                name: "Vencimento",
                table: "Gastos",
                newName: "Data");

            migrationBuilder.AddColumn<string>(
                name: "Categoria",
                table: "Gastos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
