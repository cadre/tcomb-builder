import tcomb from 'tcomb-validation';

import BaseBuilder from '../BaseBuilder';

describe('BaseBuilder', () => {
  describe('getOptions()', () => {
    describe('setDisabled()', () => {
      it('has an empty options object by default', () => {
        const builder = new BaseBuilder();

        expect(builder.getOptions()).to.deep.equal({});
      });

      it('can set a disabled option field', () => {
        const builder = new BaseBuilder().setDisabled(true);

        expect(builder.getOptions()).to.deep.equal({ disabled: true });
      });
    });

    describe('setLabel()', () => {
      it('can set a label option field', () => {
        const builder = new BaseBuilder().setLabel('foobar');

        expect(builder.getOptions()).to.deep.equal({ label: 'foobar' });
      });
    });

    describe('setName()', () => {
      it('can set a name option field', () => {
        const builder = new BaseBuilder().setName('foobar');

        expect(builder.getOptions()).to.deep.equal({ name: 'foobar' });
      });
    });

    describe('setAuto()', () => {
      it('can set the auto option field', () => {
        const builder = new BaseBuilder().setAuto('placeholders');

        expect(builder.getOptions()).to.deep.equal({ auto: 'placeholders' });
      });
    });

    describe('setAutoFocus()', () => {
      it('can set an autofocus option', () => {
        const builder = new BaseBuilder().setAutoFocus(true);

        expect(builder.getOptions().attrs).to.deep.equal({ autoFocus: true });
      });
    });

    describe('setConfig()', () => {
      it('can set arbitrary options to the field\'s config option', () => {
        const config = {
          className: 'stylish',
          theme: 'dark',
          zippityDoDah: {
            value: true,
          },
        };
        const builder = new BaseBuilder().setConfig(config);

        expect(builder.getOptions().config).to.deep.equal(config);
      });

      it('can set multiple options in the field\'s config option', () => {
        const builder = new BaseBuilder()
          .setConfig({ prop1: '1' })
          .setConfig({ prop2: '2' });

        expect(builder.getOptions().config).to.deep.equal({
          prop1: '1',
          prop2: '2',
        });
      });
    });

    describe('setTheme()', () => {
      it('can set theme options to the field\'s config option', () => {
        const theme = 'light';
        const builder = new BaseBuilder().setTheme(theme);

        expect(builder.getOptions().config).to.deep.equal({ theme: 'light' });
      });
    });

    describe('setErrorMessageTemplate()', () => {
      it('can set setErrorMessageTemplate options to the field\'s config option', () => {
        const errorTemplateCallback = error => `ERROR: ${error}`;
        const builder = new BaseBuilder().setErrorMessageTemplate(errorTemplateCallback);

        expect(builder.getOptions().config).to.deep.equal({ errorTemplateCallback });
      });
    });

    describe('setLabelTemplate()', () => {
      it('can set labelTemplateCallback options to the field\'s config option', () => {
        const labelTemplateCallback = error => `Label: ${error}`;
        const builder = new BaseBuilder().setLabelTemplate(labelTemplateCallback);

        expect(builder.getOptions().config).to.deep.equal({ labelTemplateCallback });
      });
    });

    describe('setSort()', () => {
      it('can set sort option in the config', () => {
        const sortComparator = (a, b) => {
          if (a.label < b.label) {
            return -1;
          } else if (a.label > b.label) {
            return 1;
          }
          return 0;
        };
        const builder = new BaseBuilder().setSort(sortComparator);

        expect(builder.getOptions().config).to.deep.equal({ sortComparator });
      });
    });

    describe('setVerticalRhythm()', () => {
      it('can set rhythm option to the field\'s config option', () => {
        const rhythm = 20;
        const builder = new BaseBuilder().setVerticalRhythm(rhythm);

        expect(builder.getOptions().config).to.deep.equal({ rhythm: 20 });
      });
    });

    describe('setValue()', () => {
      it('can set a label option field', () => {
        const builder = new BaseBuilder().setValue('foobar');

        expect(builder.getOptions()).to.deep.equal({ value: 'foobar' });
      });
    });

    describe('setText()', () => {
      it('can set a label option field', () => {
        const builder = new BaseBuilder().setText('foobar');

        expect(builder.getOptions()).to.deep.equal({ text: 'foobar' });
      });
    });

    describe('setHelp()', () => {
      it('can set a help option field', () => {
        const builder = new BaseBuilder().setHelp('foobar');

        expect(builder.getOptions()).to.deep.equal({ help: 'foobar' });
      });
    });

    describe('setValidationErrorMessageFn()', () => {
      it('can set an error option function', () => {
        const fn = () => { ({ foo: 'bar' }); };
        const builder = new BaseBuilder().setValidationErrorMessageFn(fn);

        expect(builder.getOptions()).to.deep.equal({ error: fn });
      });
    });

    describe('setTransformer()', () => {
      it('can set a transformer option function', () => {
        const fn = () => { ({ foo: 'bar' }); };
        const builder = new BaseBuilder().setTransformer(fn);

        expect(builder.getOptions()).to.deep.equal({ transformer: fn });
      });
    });

    describe('addValidationErrorMessageFn()', () => {
      context('no existing error message function exists', () => {
        it('sets it as the inital error function', () => {
          const fn = items => (items.length > 1 ? null : 'Too short');
          const builder = new BaseBuilder().addValidationErrorMessageFn(fn);
          expect(builder.getOptions().error(['a'])).to.equal('Too short');
        });
      });

      context('an existing error message function exists', () => {
        it('combines the new error function', () => {
          const fn1 = items => (items.length > 1 ? null : 'Too short');
          const fn2 = items => (items[0] === 'foo' ? null : 'Wrong first element');

          const builder = new BaseBuilder().setValidationErrorMessageFn(fn1);

          expect(builder.getOptions().error(['a', 'b'])).to.equal(null);

          const combinedBuilder = builder.addValidationErrorMessageFn(fn2);

          expect(combinedBuilder.getOptions().error(['a', 'b'])).to.contain('first');
          expect(combinedBuilder.getOptions().error(['foo', 'b'])).to.equal(null);
        });
      });
    });

    describe('setField()', () => {
      context('a select option has already been set', () => {
        it('should throw', () => {
          const selectOption = new BaseBuilder();
          const builder = new BaseBuilder().addSelectOption(selectOption);
          const field = new BaseBuilder();

          expect(() => builder.setField('customField', field)).to.throw('Tried to set a field');
        });
      });

      it('can set static options fields', () => {
        const fn = () => { ({ foo: 'bar' }); };
        const field = new BaseBuilder()
          .setDisabled(true)
          .setValidationErrorMessageFn(fn)
          .setLabel('foobar');
        const builder = new BaseBuilder()
          .setDisabled(true)
          .setField('customField', field);

        expect(builder.getOptions()).to.deep.equal({
          disabled: true,
          fields: { customField: { disabled: true, error: fn, label: 'foobar' } },
          order: ['customField'],
        });
      });

      it('maintains an order array in the order in which fields are added', () => {
        const field1 = new BaseBuilder();
        const field2 = new BaseBuilder();
        const field3 = new BaseBuilder();

        const builder = new BaseBuilder()
          .setField('foo', field1)
          .setField('bar', field2)
          .setField('baz', field3);

        expect(builder.getOptions().order).to.deep.equal(['foo', 'bar', 'baz']);
      });
    });

    describe('addSelectOption()', () => {
      context('a field has already been set', () => {
        it('should throw', () => {
          const field1 = new BaseBuilder();
          const builder = new BaseBuilder().setField('foo', field1);
          const selectOption = new BaseBuilder();

          expect(() => builder.addSelectOption(selectOption)).to.throw('Tried to add a select');
        });
      });

      it('creates an options array which contains the select options', () => {
        const option1 = new BaseBuilder().setValue('foo');
        const option2 = new BaseBuilder().setValue('bar');
        const option3 = new BaseBuilder().setValue('baz');
        const builder = new BaseBuilder()
          .addSelectOption(option1)
          .addSelectOption(option2)
          .addSelectOption(option3);

        expect(builder.getOptions().options).to.deep.equal([
          { value: 'foo' },
          { value: 'bar' },
          { value: 'baz' },
        ]);
      });
    });

    describe('setLazyTemplateFactory()', () => {
      context('a provider is not provided but a _templateCallback is', () => {
        it('throws if a _templateCallback is provided without a provider', () => {
          const builder = new BaseBuilder()
            .setLazyTemplateFactory(provider => provider.doAThing());

          expect(() => builder.getOptions()).to.throw('no provider was set');
        });
      });

      context('a provider is provided but a _templateCallback is not', () => {
        it('does not throw', () => {
          const builder = new BaseBuilder()
            .setLazyTemplateProvider('blah');

          expect(() => builder.getOptions()).to.not.throw();
        });
      });

      context('both a provider and a _templateCallback are available', () => {
        it('makes the provider available to the _templateCallback fn for each sub-field', () => {
          let f1 = false;
          let f2 = false;
          let f3 = false;
          const lazyTemplateProvider = {
            setF1: () => { f1 = true; },
            setF2: () => { f2 = true; },
            setF3: () => { f3 = true; },
          };
          const field1 = new BaseBuilder().setLazyTemplateFactory(provider => provider.setF1());
          const field2 = new BaseBuilder()
            .setLazyTemplateFactory(provider => provider.setF2())
            .setField('field1', field1);
          const field3 = new BaseBuilder().setLazyTemplateFactory(provider => provider.setF3());

          const builder = new BaseBuilder()
            .setField('field2', field2)
            .setField('field3', field3)
            .setLazyTemplateProvider(lazyTemplateProvider);

          builder.getOptions();

          expect(f1).to.be.true;
          expect(f2).to.be.true;
          expect(f3).to.be.true;
        });
      });

      context('concrete factory is already set', () => {
        it('does not realize the lazy template factory', () => {
          const lazyTemplateProvider = {
            setF1: () => 'lazy factory',
          };

          const factory = 'factory';
          const builder = new BaseBuilder()
            .setTemplateFactory(factory)
            .setLazyTemplateFactory(provider => provider.setF1())
            .setLazyTemplateProvider(lazyTemplateProvider);

          const options = builder.getOptions();
          expect(options.factory).to.equal(factory);
        });
      });
    });

    describe('setTemplateFactory', () => {
      it('sets the factory directly on the options object', () => {
        const factory = 'factory';

        const builder = new BaseBuilder().setTemplateFactory(factory);

        const options = builder.getOptions();
        expect(options.factory).to.equal(factory);
      });
    });

    describe('nullOption()', () => {
      it('sets a null option', () => {
        const value = 'foo';
        const text = 'bar';
        const nullOption = new BaseBuilder().setValue(value).setText(text);
        const options = new BaseBuilder()
          .setNullOption(nullOption)
          .getOptions();

        expect(options.nullOption.value).to.equal(value);
        expect(options.nullOption.text).to.equal(text);
      });
    });

    describe('setPlaceholder()', () => {
      it('sets a placeholder in the options attrs', () => {
        const placeholder = 'foobar';
        const options = new BaseBuilder()
          .setPlaceholder(placeholder)
          .getOptions();

        expect(options.attrs.placeholder).to.equal(placeholder);
      });
    });

    describe('setTypeAndValidate', () => {
      it('requires an error message to be set before validation', () => {
        const builder = new BaseBuilder()
          .setTypeAndValidate(tcomb.Any, 'myType');

        expect(() => builder.getType()).to.throw();
      });
    });
  });

  describe('getType()', () => {
    context('no sub-fields have been set', () => {
      context('no error message has been set', () => {
        it('returns the type of the current builder', () => {
          const builder = new BaseBuilder().setType(() => 'foobar');

          expect(builder.getType()).to.equal('foobar');
        });

        it('throws when no type has been set', () => {
          const builder = new BaseBuilder();
          expect(() => builder.getType()).to.throw();
        });
      });

      context('an error message has been set', () => {
        it('returns the type of the current builder', () => {
          let calledError = false;
          const errorFn = () => { calledError = true; };
          const builder = new BaseBuilder()
            .setValidationErrorMessageFn(errorFn)
            .setType(error => error());

          builder.getType();

          expect(calledError).to.be.true;
        });
      });
    });

    context('sub-fields have been set', () => {
      context('no builder types are dependent on the fieldset', () => {
        it('returns the type of only the top level builder', () => {
          const field1 = new BaseBuilder().setType(() => 'field1');
          const field2 = new BaseBuilder().setType(() => 'field2');

          const builder = new BaseBuilder()
            .setType(() => 'builder')
            .setField('field1', field1)
            .setField('field2', field2);

          expect(builder.getType()).to.equal('builder');
        });
      });

      context('builder types are dependent on the fieldset', () => {
        it('returns the type of the builder with the context of the sub-fields', () => {
          const field1 = new BaseBuilder().setType(() => 'field1');
          const field2 = new BaseBuilder().setType(() => 'field2');

          const builder = new BaseBuilder()
            .setType((error, fields) => ({ foo: fields }))
            .setField('field1', field1)
            .setField('field2', field2);

          expect(builder.getType()).to.deep.equal({
            foo: { field1: 'field1', field2: 'field2' },
          });
        });
      });
    });

    describe('makeOptional()', () => {
      context('is set', () => {
        context('single field', () => {
          it('does not throw when no value is provided', () => {
            const type = new BaseBuilder()
              .setType(() => tcomb.String)
              .makeOptional()
              .getType();

            expect(() => type()).to.not.throw();
            expect(() => type('foo')).to.not.throw();
          });
        });

        context('compound type', () => {
          it('does not throw when no value is provided', () => {
            const field1 = new BaseBuilder()
              .setType(() => tcomb.String);

            const field2 = new BaseBuilder()
              .setType(() => tcomb.String);

            const page = new BaseBuilder()
              .setField('field1', field1)
              .setField('field2', field2)
              .setType((e, fields) => tcomb.struct(fields))
              .makeOptional()
              .getType();

            expect(() => page()).to.not.throw();
            expect(() => page({ field1: 'foo', field2: 'bar' })).to.not.throw();
          });
        });
      });

      context('is not set', () => {
        context('single field', () => {
          it('throws when no value is provided', () => {
            const type = new BaseBuilder()
              .setType(() => tcomb.String)
              .getType();

            expect(() => type()).to.throw();
            expect(() => type('foo')).to.not.throw();
          });
        });

        context('compound type', () => {
          it('throws when no value is provided', () => {
            const field1 = new BaseBuilder()
              .setType(() => tcomb.String);

            const field2 = new BaseBuilder()
              .setType(() => tcomb.String);

            const page = new BaseBuilder()
              .setField('field1', field1)
              .setField('field2', field2)
              .setType((e, fields) => tcomb.struct(fields))
              .getType();

            expect(() => page()).to.throw();
            expect(() => page({ field1: 'foo', field2: 'bar' })).to.not.throw();
          });
        });
      });
    });
  });
});
