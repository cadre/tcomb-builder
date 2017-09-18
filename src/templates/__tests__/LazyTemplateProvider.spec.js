import LazyTemplateProvider from '../LazyTemplateProvider';
import mockProvider from './mockProvider';

describe('LazyTemplateProvider', () => {
  it('throws when setting an undefined template', () => {
    const provider = new LazyTemplateProvider();
    expect(() => provider.setCheckbox(null)).to.throw();
  });

  it('throws when getting an undefined template', () => {
    const provider = new LazyTemplateProvider();
    expect(() => provider.getCheckbox()).to.throw();
  });

  it('sets and gets templates', () => {
    expect(mockProvider.getCheckbox()).to.equal('mock checkbox');
    expect(mockProvider.getCheckboxGroup()).to.equal('mock checkbox group');
    expect(mockProvider.getDropDown()).to.equal('mock dropdown');
    expect(mockProvider.getRadio()).to.equal('mock radio');
    expect(mockProvider.getStaticPage()).to.equal('mock static page');
  });
});
