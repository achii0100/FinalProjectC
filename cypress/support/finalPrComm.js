Cypress.Commands.add('regDet', (details) => {
    const random = Date.now();
    const randName = details.name + random;
    const randPhone = details.randPhon + random;
    const randPersonalId = details.persNumb + random;

    cy.get('[name="first_name"]').type(randName);
    cy.get('[name="phone"]').type(randPhone);
    cy.get('[name="personal_id"]').type(randPersonalId);   
    cy.get('[name="reg_password_confirmation"]').type(details.rePass); 
});


Cypress.Commands.add('incLog', (log)=>{
    cy.get('[name="login_email"]').type(log.incEmail)
    cy.get('[name="login_password"]').type(log.incPass)
})