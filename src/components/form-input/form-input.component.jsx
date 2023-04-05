import './form-input.styles.scss'

function FormInput({label, ...otherProps}) {
    
    return (
        <div className="group">
            <label className={`${
                otherProps.value.length > 0 
                ? 'shrink ' 
                : ''} form-input-label`}>
                    {label}
            </label>

            <input className='form-input'
                {...otherProps}
                // label='Display Name'
                // type='text'
                // required
                // name='displayName'
                // value={displayName}
                // onChange={handleChange}
            />
        </div>
        
    )
}

export default FormInput


/*
 Here we make use of a dynamic class from the sass provided in the styles file

 Also, the effect to make the label shrink on selecting the field input isn;t working
 cause i prefer it this way. To make it work, using the style in the styles sheet, you
 put the input field above the label field as below:

 `
    <div className="group">
        
        <input className='form-input'
            {...otherProps}
        />
    
        <label className={`${
            otherProps.value.length > 0 
            ? 'shrink ' 
            : ''} form-input-label`}>
                {label}
        </label>

        
    </div>
 `
*/