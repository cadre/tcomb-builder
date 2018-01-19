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
        const builder = new BaseBuilder().setSort(sortComparator, 'LabelSort');

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

    describe('setHasError()', () => {
      it('sets the hasError boolean in the options object', () => {
        const builder = new BaseBuilder().setHasError(true);

        expect(builder.getOptions().hasError).to.be.true;
      });
    });

    describe('setError()', () => {
      it('sets an error key in the options object', () => {
        const error = 'errorStr';
        const builder = new BaseBuilder().setError(error);

        expect(builder.getOptions().error).to.equal(error);
      });

      it('sets hasError to true in the options object by default', () => {
        const builder = new BaseBuilder().setError('errorStr');

        expect(builder.getOptions().hasError).to.be.true;
      });

      it('overrides hasError setting by default', () => {
        const builder = new BaseBuilder().setError('errorStr', { overrideHasError: true });

        expect(builder.getOptions().hasError).to.be.undefined;
      });
    });

    describe('setValidation()', () => {
      it('can set a validation function', () => {
        const fn = () => { ({ foo: 'bar' }); };
        const builder = new BaseBuilder()
          .setType(() => tcomb.String, 'String')
          .setValidation(fn, 'FooBarValidation');

        expect(builder.getType().getValidationErrorMessage).to.equal(fn);
      });
    });

    describe('setTransformer()', () => {
      it('can set a transformer option function', () => {
        const fn = () => { ({ foo: 'bar' }); };
        const builder = new BaseBuilder().setTransformer(fn, 'FooTransformer');

        expect(builder.getOptions()).to.deep.equal({ transformer: fn });
      });
    });

    describe('addValidation()', () => {
      context('no existing validation function exists', () => {
        it('sets the validation function', () => {
          const fn = items => (items.length > 1 ? null : 'Too short');
          const builder = new BaseBuilder()
            .setType(() => tcomb.String, 'String')
            .addValidation(fn, 'LengthValidation');
          expect(builder.getType().getValidationErrorMessage(['a'])).to.equal('Too short');
        });
      });

      context('an existing validation function exists', () => {
        it('combines the existing and new validation functions', () => {
          const fn1 = items => (items.length > 1 ? null : 'Too short');
          const fn2 = items => (items[0] === 'foo' ? null : 'Wrong first element');

          const builder = new BaseBuilder()
            .setType(() => tcomb.String, 'String')
            .setValidation(fn1, 'LengthValidation');

          expect(builder.getType().getValidationErrorMessage(['a', 'b'])).to.equal(null);

          const combinedBuilder = builder.addValidation(fn2, 'FirstElementValidation');

          const combinedType = combinedBuilder.getType();
          expect(combinedType.getValidationErrorMessage(['a', 'b'])).to.contain('first');
          expect(combinedType.getValidationErrorMessage(['foo', 'b'])).to.equal(null);
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
        const fn = 'errorStr';
        const field = new BaseBuilder()
          .setDisabled(true)
          .setError(fn)
          .setLabel('foobar');
        const builder = new BaseBuilder()
          .setDisabled(true)
          .setField('customField', field);

        expect(builder.getOptions()).to.deep.equal({
          disabled: true,
          fields: {
            customField: {
              disabled: true,
              error: 'errorStr',
              hasError: true,
              label: 'foobar',
            },
          },
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
            .setLazyTemplateFactory(provider => provider.doAThing(), 'AThing');

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
          const field1 = new BaseBuilder()
            .setLazyTemplateFactory(provider => provider.setF1(), 'F1');
          const field2 = new BaseBuilder()
            .setLazyTemplateFactory(provider => provider.setF2(), 'F2')
            .setField('field1', field1);
          const field3 = new BaseBuilder()
            .setLazyTemplateFactory(provider => provider.setF3(), 'F3');

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
            .setLazyTemplateFactory(provider => provider.setF1(), 'F1')
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
          const builder = new BaseBuilder().setType(() => tcomb.String, 'String');

          expect(builder.getType()).to.equal(tcomb.String);
        });

        it('throws when no type has been set', () => {
          const builder = new BaseBuilder();
          expect(() => builder.getType()).to.throw();
        });
      });
    });

    context('sub-fields have been set', () => {
      context('no builder types are dependent on the fieldset', () => {
        it('returns the type of only the top level builder', () => {
          const field1 = new BaseBuilder().setType(() => tcomb.String, 'String');
          const field2 = new BaseBuilder().setType(() => tcomb.String, 'String');

          const builder = new BaseBuilder()
            .setType(() => tcomb.String, 'String')
            .setField('field1', field1)
            .setField('field2', field2);

          expect(builder.getType()).to.equal(tcomb.String);
        });
      });

      context('builder types are dependent on the fieldset', () => {
        it('returns the type of the builder with the context of the sub-fields', () => {
          const validation1 = () => 'foo';
          const field1 = new BaseBuilder()
            .setValidation(validation1, 'FooValidation')
            .setType(() => tcomb.String, 'String');

          const validation2 = () => 'bar';
          const field2 = new BaseBuilder()
            .setValidation(validation2, 'BarValidation')
            .setType(() => tcomb.Number, 'Number');

          const builderValidation = () => 'builder';
          const builder = new BaseBuilder()
            .setType((error, fields) => ({ foo: fields }), 'Foo')
            .setValidation(builderValidation, 'BuilderValidation')
            .setField('field1', field1)
            .setField('field2', field2);

          expect(builder.getType()).to.deep.equal({
            foo: { field1: tcomb.String, field2: tcomb.Number },
            getValidationErrorMessage: builderValidation,
          });
        });
      });
    });

    describe('makeOptional()', () => {
      context('is set', () => {
        context('single field', () => {
          it('does not throw when no value is provided', () => {
            const type = new BaseBuilder()
              .setType(() => tcomb.String, 'String')
              .makeOptional()
              .getType();

            expect(() => type()).to.not.throw();
            expect(() => type('foo')).to.not.throw();
          });
        });

        context('compound type', () => {
          it('does not throw when no value is provided', () => {
            const field1 = new BaseBuilder()
              .setType(() => tcomb.String, 'String');

            const field2 = new BaseBuilder()
              .setType(() => tcomb.String, 'String');

            const page = new BaseBuilder()
              .setField('field1', field1)
              .setField('field2', field2)
              .setType((e, fields) => tcomb.struct(fields), 'FooStruct')
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
              .setType(() => tcomb.String, 'String')
              .getType();

            expect(() => type()).to.throw();
            expect(() => type('foo')).to.not.throw();
          });
        });

        context('compound type', () => {
          it('throws when no value is provided', () => {
            const field1 = new BaseBuilder()
              .setType(() => tcomb.String, 'String');

            const field2 = new BaseBuilder()
              .setType(() => tcomb.String, 'String');

            const page = new BaseBuilder()
              .setField('field1', field1)
              .setField('field2', field2)
              .setType((e, fields) => tcomb.struct(fields), 'FooStruct')
              .getType();

            expect(() => page()).to.throw();
            expect(() => page({ field1: 'foo', field2: 'bar' })).to.not.throw();
          });
        });
      });
    });
  });

  describe('isEqual()', () => {
    it('returns false if passed null or undefined', () => {
      const builder = new BaseBuilder();
      expect(builder.isEqual(null)).to.be.false;
      expect(builder.isEqual(undefined)).to.be.false;
    });

    it('returns true when passed the same instance', () => {
      const builder = new BaseBuilder();
      expect(builder.isEqual(builder)).to.be.true;
    });

    it('returns true if all fields are equal', () => {
      const builder1 = new BaseBuilder()
        .setField('subfield1', new BaseBuilder())
        .setField('subfield2', new BaseBuilder());
      const builder2 = new BaseBuilder()
        .setField('subfield1', new BaseBuilder())
        .setField('subfield2', new BaseBuilder());

      expect(builder1.isEqual(builder2)).to.be.true;
    });

    it('returns false if any fields are not equal', () => {
      const builder1 = new BaseBuilder()
        .setField('subfield1', new BaseBuilder())
        .setField('subfield2', new BaseBuilder());
      const builder2 = new BaseBuilder()
        .setField('foo', new BaseBuilder().setLabel('Foo'))
        .setField('subfield2', new BaseBuilder());

      expect(builder1.isEqual(builder2)).to.be.false;
    });

    it('returns true if both configs are equal', () => {
      const builder1 = new BaseBuilder()
        .setField('subfield1', new BaseBuilder()
          .setConfig({ foo: 'bar' }));
      const builder2 = new BaseBuilder()
        .setField('subfield1', new BaseBuilder()
          .setConfig({ foo: 'bar' }));

      expect(builder1.isEqual(builder2)).to.be.true;
    });

    it('returns false if configs are not equal', () => {
      const builder1 = new BaseBuilder()
        .setField('subfield1', new BaseBuilder()
          .setConfig({ foo: 'bar' }))
        .setField('subfield2', new BaseBuilder());
      const builder2 = new BaseBuilder()
        .setField('subfield1', new BaseBuilder()
          .setConfig({ foo: 'baz' }))
        .setField('subfield2', new BaseBuilder());

      expect(builder1.isEqual(builder2)).to.be.false;
    });

    it('returns true if options fields are equal', () => {
      const builder1 = new BaseBuilder().setLabel('Foo');
      const builder2 = new BaseBuilder().setLabel('Foo');

      expect(builder1.isEqual(builder2)).to.be.true;
    });

    it('returns false if options fields are not equal', () => {
      const builder1 = new BaseBuilder().setLabel('Foo');
      const builder2 = new BaseBuilder().setLabel('Bar');

      expect(builder1.isEqual(builder2)).to.be.false;
    });

    it('returns true if two builder functions have the same name', () => {
      // Different functions, same name.
      const factory1 = () => 'Error';
      const factory2 = () => 'Error';
      const builder1 = new BaseBuilder()
        .setLazyTemplateFactory(factory1, 'Factory1');
      const builder2 = new BaseBuilder()
        .setLazyTemplateFactory(factory2, 'Factory1');

      expect(builder1.isEqual(builder2)).to.be.true;
    });

    it('returns false if two builder functions have different names', () => {
      {
        // Different functions, different names.
        const factory1 = () => 'Error';
        const factory2 = () => 'Error';
        const builder1 = new BaseBuilder()
          .setLazyTemplateFactory(factory1, 'Factory1');
        const builder2 = new BaseBuilder()
          .setLazyTemplateFactory(factory2, 'Factory2');

        expect(builder1.isEqual(builder2)).to.be.false;
      }

      {
        // Same function, different names.
        const factory = () => 'Error';
        const builder1 = new BaseBuilder()
          .setLazyTemplateFactory(factory, 'Factory1');
        const builder2 = new BaseBuilder()
          .setLazyTemplateFactory(factory, 'Factory2');

        expect(builder1.isEqual(builder2)).to.be.false;
      }
    });

    it('returns true if validation functions are set in the same order', () => {
      const error = () => 'Error';
      const builder1 = new BaseBuilder()
        .setValidation(error, 'Error1')
        .addValidation(error, 'Error2');
      const builder2 = new BaseBuilder()
        .setValidation(error, 'Error1')
        .addValidation(error, 'Error2');

      expect(builder1.isEqual(builder2)).to.be.true;
    });

    it('returns false if validation functions are set in a different order', () => {
      const error = () => 'Error';
      const builder1 = new BaseBuilder()
        .setValidation(error, 'Error1')
        .addValidation(error, 'Error2');
      const builder2 = new BaseBuilder()
        .setValidation(error, 'Error2')
        .addValidation(error, 'Error1');

      expect(builder1.isEqual(builder2)).to.be.false;
    });

    it('returns true if two options functions have the same name', () => {
      const transformer1 = () => 'Fn1';
      const transformer2 = () => 'Fn2';
      const builder1 = new BaseBuilder()
        .setTransformer(transformer1, 'Transformer1');
      const builder2 = new BaseBuilder()
        .setTransformer(transformer2, 'Transformer1');

      expect(builder1.isEqual(builder2)).to.be.true;
    });

    it('returns false if two options functions have a different name', () => {
      const transformer1 = () => 'Fn1';
      const transformer2 = () => 'Fn2';
      const builder1 = new BaseBuilder()
        .setTransformer(transformer1, 'Transformer1');
      const builder2 = new BaseBuilder()
        .setTransformer(transformer2, 'Transformer2');

      expect(builder1.isEqual(builder2)).to.be.false;
    });

    it('returns true if two config functions have the same name', () => {
      const comparator1 = () => 'Fn1';
      const comparator2 = () => 'Fn2';
      const builder1 = new BaseBuilder()
        .setSort(comparator1, 'Comparator1');
      const builder2 = new BaseBuilder()
        .setSort(comparator2, 'Comparator1');

      expect(builder1.isEqual(builder2)).to.be.true;
    });

    it('returns false if two config functions have a different name', () => {
      const comparator1 = () => 'Fn1';
      const comparator2 = () => 'Fn2';
      const builder1 = new BaseBuilder()
        .setSort(comparator1, 'Comparator1');
      const builder2 = new BaseBuilder()
        .setSort(comparator2, 'Comparator2');

      expect(builder1.isEqual(builder2)).to.be.false;
    });
  });
});
