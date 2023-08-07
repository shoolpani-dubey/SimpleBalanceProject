import {describe, expect, test, vi} from 'vitest';
import { fetchBalanceForDate } from './fetchService';

global.fetch = vi.fn();

describe("Fetch Test", () => {
    function createFetchResponse() {
        return { json: () => new Promise((resolve) => resolve({
            cumulativeBalance:0,
            monthlyBalance:0
        })) }
    }
    
    test("Should resolve the fetch", async () => {
        // render(<App />);
        const date = new Date();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global.fetch as any).mockResolvedValue(createFetchResponse())

        const resp = await fetchBalanceForDate(date)
        // expect(fetchBalanceForDate).toHaveBeenCalled()
        // expect(screen.getByText(/Testing/i)).toBeDefined()
        expect(resp).toEqual({
            cumulativeBalance:0,
            monthlyBalance:0
        })
    })
})