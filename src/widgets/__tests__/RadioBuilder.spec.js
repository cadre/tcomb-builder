import RadioBuilder from '../RadioBuilder';

describe('RadioBuilder', () => {
  describe('setLayout()', () => {
    it('can set layout option to the field\'s config option', () => {
      const layout = 'horizontal';
      const builder = RadioBuilder
        .setLayout(layout)
        ._disableTemplates(layout);

      expect(builder.getOptions().config).to.deep.equal({ layout: 'horizontal' });
    });
  });
});
