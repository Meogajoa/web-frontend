import { assert } from '@/utils/assert';
import fs from 'fs';

const createComponentTemplate = (name: string) => `
import React from 'react';
import { cn } from '@/utils/classname';

type Props = {
  className: string;
}

const ${name}: React.FC<Props> = ({ className }) => {
  return <div className={cn('', className)}></div>;
};

export default ${name};
`;

const createStoryTemplate = (name: string) => `
import { Meta, StoryObj } from '@storybook/react';
import ${name} from '@/components/${name}';

const meta: Meta<typeof ${name}> = {
  title: 'Example/${name}',
  component: ${name},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ${name}>;

export const Default: Story = {
  args: {
    className: '',
  },
};
`;

const createSvgIconTemplate = (name: string) => `
import React from 'react';

type Props = React.ComponentProps<'svg'>;

const ${name}: React.FC<Props> = (props) => {
  return <svg {...props}></svg>;
};

export default ${name};
`;

const GENERATORS = {
  component: {
    filePath: (fileName: string) => `src/components/${fileName}.tsx`,
    template: createComponentTemplate,
  },
  story: {
    filePath: (fileName: string) => `src/components/${fileName}.stories.tsx`,
    template: createStoryTemplate,
  },
  svg: {
    filePath: (fileName: string) => `src/svgs/${fileName}.tsx`,
    template: createSvgIconTemplate,
  },
};

type GeneratorType = keyof typeof GENERATORS;

function generate() {
  const type = process.argv[2] as GeneratorType;
  const name = process.argv[3];

  if (!type || !name) {
    console.info('Usage: npm run gen [type] [name]');
    process.exit();
  }

  if (!GENERATORS[type]) {
    console.error(
      `[Unsupported Type] support types: ["${Object.keys(GENERATORS).join(
        '", "',
      )}"]`,
    );
    process.exit();
  }

  const filePath = GENERATORS[type].filePath(name);
  const isExist = fs.existsSync(filePath);

  assert(!isExist, `File already exists at ${filePath}`);

  fs.writeFileSync(filePath, GENERATORS[type].template(name).trim());
}

generate();
