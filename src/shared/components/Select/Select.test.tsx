import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Select, type TSelectOption } from './Select';

const mockOnChange = vi.fn();

const mockOptions: TSelectOption[] = [
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' }
];

const selectedOption = mockOptions[0];
const anotherOption = mockOptions[1];

const defaultProps = {
  options: mockOptions,
  onChange: mockOnChange,
  placeholder: 'Select an option',
  size: 'medium' as const
};

describe('Select', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('should show default placeholder when nothing is selected', () => {
    const expected = defaultProps.placeholder;

    render(<Select {...defaultProps} />);
    const result = screen.getByRole('button');

    expect(result).toHaveTextContent(expected);
  });

  it('should show a custom placeholder', () => {
    const placeholder = 'Status';
    const expected = placeholder;

    render(<Select {...defaultProps} placeholder={placeholder} />);
    const result = screen.getByRole('button');

    expect(result).toHaveTextContent(expected);
  });

  it('should show selected option label when value matches', () => {
    const value = selectedOption.value;
    const expected = selectedOption.label;

    render(<Select {...defaultProps} value={value} />);
    const result = screen.getByRole('button');

    expect(result).toHaveTextContent(expected);
  });

  it('should match selected value case-insensitively', () => {
    const value = 'ALIVE';
    const expected = selectedOption.label;

    render(<Select {...defaultProps} value={value} />);
    const result = screen.getByRole('button');

    expect(result).toHaveTextContent(expected);
  });

  it('should show placeholder when value is not in options', () => {
    const value = 'robot';
    const expected = defaultProps.placeholder;

    render(<Select {...defaultProps} value={value} />);
    const result = screen.getByRole('button');

    expect(result).toHaveTextContent(expected);
  });

  it('should apply medium size class by default', () => {
    const expected = 'selector_size_medium';

    const { container } = render(<Select {...defaultProps} />);
    const result = container.firstElementChild;

    expect(result).toHaveClass(expected);
  });

  it('should apply small size class', () => {
    const size = 'small' as const;
    const expected = 'selector_size_small';

    const { container } = render(<Select {...defaultProps} size={size} />);
    const result = container.firstElementChild;

    expect(result).toHaveClass(expected);
  });

  it('should not render options list when closed', () => {
    render(<Select {...defaultProps} />);
    const result = screen.queryByRole('list');

    expect(result).not.toBeInTheDocument();
  });

  it('should open options list on button click', async () => {
    const user = userEvent.setup();

    render(<Select {...defaultProps} />);
    const button = screen.getByRole('button');

    await user.click(button);
    const result = screen.getByRole('list');

    expect(result).toBeInTheDocument();
  });

  it('should add opened class when dropdown is open', async () => {
    const user = userEvent.setup();
    const expected = 'selector_opened';

    const { container } = render(<Select {...defaultProps} />);
    const button = screen.getByRole('button');

    await user.click(button);
    const result = container.firstElementChild;

    expect(result).toHaveClass(expected);
  });

  it('should close options list on second button click', async () => {
    const user = userEvent.setup();

    render(<Select {...defaultProps} />);
    const button = screen.getByRole('button');

    await user.click(button);
    await user.click(button);
    const result = screen.queryByRole('list');

    expect(result).not.toBeInTheDocument();
  });

  it('should render all option labels when open', async () => {
    const user = userEvent.setup();
    const expected = mockOptions.map((option) => option.label);

    render(<Select {...defaultProps} />);
    const button = screen.getByRole('button');

    await user.click(button);
    const result = screen.getAllByRole('listitem').map((item) => item.textContent);

    expect(result).toEqual(expected);
  });

  it('should mark selected option', async () => {
    const user = userEvent.setup();
    const value = selectedOption.value;
    const expected = 'selector__option_selected';

    render(<Select {...defaultProps} value={value} />);
    const button = screen.getByRole('button');

    await user.click(button);
    const result = screen.getAllByRole('listitem')[0];

    expect(result).toHaveClass(expected);
  });

  it('should call onChange with option label when another option is clicked', async () => {
    const user = userEvent.setup();
    const value = selectedOption.value;
    const expected = anotherOption.label;

    render(<Select {...defaultProps} value={value} />);
    const button = screen.getByRole('button');

    await user.click(button);
    await user.click(screen.getByText(anotherOption.label));

    expect(mockOnChange).toHaveBeenCalledWith(expected);
  });

  it('should call onChange with empty string when selected option is clicked', async () => {
    const user = userEvent.setup();
    const value = selectedOption.value;
    const expected = '';

    render(<Select {...defaultProps} value={value} />);
    const button = screen.getByRole('button');

    await user.click(button);
    await user.click(screen.getAllByRole('listitem')[0]);

    expect(mockOnChange).toHaveBeenCalledWith(expected);
  });

  it('should close dropdown after option click', async () => {
    const user = userEvent.setup();

    render(<Select {...defaultProps} />);
    const button = screen.getByRole('button');

    await user.click(button);
    await user.click(screen.getByText(anotherOption.label));
    const result = screen.queryByRole('list');

    expect(result).not.toBeInTheDocument();
  });

  it('should render empty options list when options are empty', async () => {
    const user = userEvent.setup();
    const options: TSelectOption[] = [];
    const expected: HTMLElement[] = [];

    render(<Select {...defaultProps} options={options} />);
    const button = screen.getByRole('button');

    await user.click(button);
    const result = screen.queryAllByRole('listitem');

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(result).toEqual(expected);
  });

  it('should render custom option content', async () => {
    const user = userEvent.setup();
    const SelectOptionContentComponent = ({
      option
    }: {
      option: TSelectOption;
    }) => <span data-testid='custom-option'>{option.label}</span>;
    const expected = mockOptions.length;

    render(
      <Select
        {...defaultProps}
        SelectOptionContentComponent={SelectOptionContentComponent}
      />
    );
    const button = screen.getByRole('button');

    await user.click(button);
    const result = screen.getAllByTestId('custom-option');

    expect(result).toHaveLength(expected);
  });

  it('should close dropdown on outside click', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Select {...defaultProps} />
        <button type='button'>outside</button>
      </div>
    );
    const button = screen.getByRole('button', { name: /select an option/i });
    const outside = screen.getByRole('button', { name: 'outside' });

    await user.click(button);
    await user.click(outside);
    const result = screen.queryByRole('list');

    expect(result).not.toBeInTheDocument();
  });
});
