// { onCheckboxChange, selectedGender }
const GenderCheckbox = (props) => {
  return (
    <div className="flex">
      <div className="form-control">
        {/* ${selectedGender === "male" ? "selected" : ""} */}
        <label
          className={`label gap-2 cursor-pointer ${
            props.selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            // checked={selectedGender === "male"}
            checked={props.selectedGender === "male"}
            onChange={() => props.onchckboxChange("male")}
            // onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        {/* ${selectedGender === "female" ? "selected" : ""} */}
        <label
          className={`label gap-2 cursor-pointer ${
            props.selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            // checked={selectedGender === "female"}
            checked={props.selectedGender === "female"}
            onChange={() => props.onchckboxChange("female")}
            // onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;

// STARTER CODE FOR THIS FILE
// const GenderCheckbox = () => {
// 	return (
// 		<div className='flex'>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Male</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Female</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 		</div>
// 	);
// };
// export default GenderCheckbox;
