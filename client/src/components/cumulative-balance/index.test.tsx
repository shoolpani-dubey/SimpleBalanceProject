import {describe, expect, test} from 'vitest';
import CumulativeBalance from '.';
import {render, screen} from '@testing-library/react';

describe('Cumulative Balance Test',()=>{
    test('Should render cumulative balance',()=>{
        render(<CumulativeBalance value={10}/>);
        expect(screen.getByTestId('cum-bal-div')).toBeDefined();
        expect(screen.getByTestId('cum-bal-val-div')).toBeDefined();
        const screenEle = screen.getByTestId('cum-bal-val-div');
        expect(screenEle.innerHTML).toContain("10");
    });
});