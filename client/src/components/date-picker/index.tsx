import dateStyle from './index.module.scss';

interface DatePickerIntf{
    defaultValue: Date,
    value: Date,
    onDateSelect: (date:Date)=>void
}
export default function DatePicker(props:DatePickerIntf){
    const dateErrorMsg = "Invalid Date Selected";
    const getInDateString = (d:Date) => {
        const day = d.getDate()>9?d.getDate():`0${d.getDate()}`;
        const month = (d.getMonth()+1)>9?(d.getMonth()+1):`0${(d.getMonth()+1)}`;
        const year = d.getFullYear();
        const reqFormat = `${year}-${month}-${day}`;
        return reqFormat;
    };
    const getInDateObject = (d:string)=>{
        const returnDate = new Date();
        try{
            const dArr = d.split('-');
            
            returnDate.setDate(Number(dArr[2]));
            returnDate.setMonth(Number(dArr[1])-1);
            returnDate.setFullYear(Number(dArr[0]));
        }catch(e){
            alert(dateErrorMsg);
            return null;
        }
        return returnDate;
    };
    const handleDateChange = (e:React.FormEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;
        const dateObj = getInDateObject(val);
        if(!dateObj){
            return;
        }
        props.onDateSelect(dateObj);
    };
    return <div className={dateStyle.datePickerWrapper}>
        <label>Select Date</label>
        <input
            type="date"
            max={getInDateString(new Date())}
            value={getInDateString(props.defaultValue)}
            onChange={handleDateChange} />
    </div>;
}