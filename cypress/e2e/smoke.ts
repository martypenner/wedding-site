describe('smoke tests', () => {
	it('should allow you to register and login', () => {
		cy.visit('/');

		cy.findByRole('link', { name: /rsvp/i });
		cy.findByRole('heading', { name: /celebrate with us!/i });
	});
});
