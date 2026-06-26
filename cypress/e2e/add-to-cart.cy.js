describe("Carrito de compras", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it("Debe agregar un producto al carrito", () => {

    // Esperar que carguen los productos
    cy.contains("Ver detalle").should("be.visible");

    // Entrar al detalle del primer producto
    cy.contains("Ver detalle").first().click();

    // Estamos en el detalle
    cy.url().should("include", "/item/");

    // Elegir cantidad 1
    cy.get(".ButtonIncrement").click();

    // Agregar al carrito
    cy.contains("Agregar al carrito").click();

    // Debe aparecer este botón
    cy.contains("Terminar compra").should("exist");

    // El widget debe mostrar 1
    cy.get(".CartWidget")
      .should("be.visible")
      .and("contain", "1");
  });

});