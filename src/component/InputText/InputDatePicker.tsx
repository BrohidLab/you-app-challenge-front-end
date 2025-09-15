import DatePicker from 'react-datepicker';

const InputDatePicker = ({selected, onChange, id, className}) => {
    return (
        <>
            <DatePicker
                selected={selected}
                onChange={(e) => onChange(id, e)}
                className="w-full px-5 flex-2 text-right py-3 text-sm md:text-md bg-[rgba(255,255,255,0.1)] rounded-md text-white"
                wrapperClassName="w-full "
                />

        </>
    )
}

export default InputDatePicker;