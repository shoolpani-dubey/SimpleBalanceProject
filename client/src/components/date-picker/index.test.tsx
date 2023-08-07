import {describe, expect, test} from 'vitest';
import DatePicker from './index';
import {render, screen} from '@testing-library/react';

describe("Date Picker Test", () => {

    test("Should render DatePicker with label and input", () => {
        const date = new Date();

        render(<DatePicker
            defaultValue={date}
            value={date}
            onDateSelect={()=>{}} />);
        
        expect(screen.findByTestId('date-picker-label')).toBeDefined();
        expect(screen.findByTestId('date-picker')).toBeDefined();
    });
})