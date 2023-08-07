import {describe, expect, test, vi, beforeAll} from 'vitest';
import App from './App';
import {render} from '@testing-library/react';
import DatePicker from './components/date-picker';
import ResultComp from './components/result-component';
import MonthlyBalance from './components/monthly-balance';
import CumulativeBalance from './components/cumulative-balance';

global.fetch = vi.fn();
function createFetchResponse() {
    return { json: () => new Promise((resolve) => resolve({
        cumulativeBalance:0,
        monthlyBalance:0
    })) }
}
beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global.fetch as any).mockResolvedValue(createFetchResponse())
})
describe("App Test", () => {
    test("Should render DatePicker", () => {
        render(<App />);
        const date = new Date();
        expect(<DatePicker
            defaultValue={date}
            value={date}
            onDateSelect={()=>{}}/>).toBeDefined();
    })
    test('Should render ResultComp',()=>{
        render(<App />);
        expect(<ResultComp >{}</ResultComp>).toBeDefined();
    })
    test('Should render ResultComp with Monthly Balance',()=>{
        render(<App />);
        expect(
            <MonthlyBalance value={0}/>
        ).toBeDefined();
    })
    test('Should render ResultComp with CumulativeBalance Balance',()=>{
        render(<App />);
        expect(
            <CumulativeBalance value={0}/>
        ).toBeDefined();
    })
})