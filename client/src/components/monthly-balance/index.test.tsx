import {render, screen} from '@testing-library/react';
import {test, expect} from 'vitest';
import MonthlyBalance from '.';

test('display monthly balance',()=>{
    render(<MonthlyBalance value={100} />);

    expect(screen.getByTestId('monthly-bal-div')).toBeDefined();
    expect(screen.getByTestId('monthly-bal-val-div')).toBeDefined();
    const screenEle = screen.getByTestId('monthly-bal-val-div');
    expect(screenEle.innerHTML).toContain("100");
});