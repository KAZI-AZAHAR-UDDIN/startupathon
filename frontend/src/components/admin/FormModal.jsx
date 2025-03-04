import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useEffect } from 'react';
import { motionContainer, motionButton } from '../../utils/motionStyles'; 

export default function FormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  fields, 
  title,
  initialValues 
}) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue
  } = useForm({ defaultValues: initialValues });

  const formatDateForInput = (date) => {
    if (!date) return "";  // If date is null/undefined, return empty string
    return new Date(date).toISOString().split("T")[0];  // Extracts only YYYY-MM-DD
  };
  
  // Handle form reset when initialValues change
  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  // Handle form submission and close modal
  const onFormSubmit = async (data) => {
    await onSubmit(data); // Call the onSubmit prop
    reset(); // Reset form after submission
    onClose(); // Close the modal after submission
  };

  const handleClose = () => {
    reset(); // Reset form on manual close
    onClose();
  };

  const renderInput = (field) => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...register(field.name, { required: field.required })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-wave-purple focus:outline-none h-32 bg-card-bg/20 backdrop-blur-xl border-white/10"
          />
        );

      case 'select':
        return (
          <select
            {...register(field.name, { required: field.required })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-wave-purple focus:outline-none bg-card-bg/20 backdrop-blur-xl border-white/10"
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'date':
        return (
          <input
            type="date"
            {...register(field.name, { required: field.required })}
            defaultValue={formatDateForInput(initialValues?.[field.name])}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-wave-purple focus:outline-none bg-card-bg/20 backdrop-blur-xl border-white/10"
          />
        );

      case 'tags':
        return (
          <input
            type="text"
            {...register(field.name)}
            placeholder={field.placeholder || 'Comma separated values'}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-wave-purple focus:outline-none bg-card-bg/20 backdrop-blur-xl border-white/10"
          />
        );

      default:
        return (
          <input
            type={field.type || 'text'}
            {...register(field.name, { required: field.required })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-wave-purple focus:outline-none bg-card-bg/20 backdrop-blur-xl border-white/10"
            placeholder={field.placeholder}
          />
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div {...motionContainer('fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50')}>
      <div {...motionContainer('bg-card-bg/20 backdrop-blur-xl rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10 shadow-3d')}>
        <div className="flex justify-between items-center p-4 border-b border-white/10 sticky top-0 bg-card-bg/30 backdrop-blur-xl">
          <h3 className="text-xl font-extrabold text-text-primary">
            {title}
          </h3>
          <button 
            onClick={handleClose} 
            className="text-text-secondary hover:text-text-primary"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onFormSubmit)} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div 
              key={field.name}
              className={`mb-4 ${field.fullWidth ? 'col-span-2' : ''}`}
            >
              <label className="block text-sm font-medium text-text-primary mb-1">
                {field.label}
                {field.required && <span className="text-accent-yellow ml-1">*</span>}
              </label>
              
              {renderInput(field)}

              {errors[field.name] && (
                <span className="text-accent-yellow text-sm">
                  {errors[field.name].message || 'This field is required'}
                </span>
              )}
            </div>
          ))}

          <div className="col-span-2 flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-text-secondary hover:bg-card-bg/20 rounded-full transition-all duration-300 shadow-md"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              className="px-4 py-2 bg-button-bg text-text-primary rounded-full hover:bg-button-hover transition-all duration-300 shadow-3d"
              {...motionButton()}
            >
              Submit
              </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}