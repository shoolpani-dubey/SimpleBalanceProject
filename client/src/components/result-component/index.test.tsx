import {render} from '@testing-library/react';
import {test, expect} from 'vitest';
import ResultComp from '.';
import MonthlyBalance from '../monthly-balance';

test('Test Result component',()=>{
    render(<ResultComp ><MonthlyBalance value={10}/></ResultComp>);

    expect(<MonthlyBalance value={10}/>).toBeDefined();
});