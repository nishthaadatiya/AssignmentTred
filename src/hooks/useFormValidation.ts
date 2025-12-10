import { useState, useCallback } from 'react';

interface ValidationRule {
  field: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

interface ValidationErrors {
  [field: string]: string;
}

export const useFormValidation = (rules: ValidationRule[]) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = useCallback((data: Record<string, any>): boolean => {
    const newErrors: ValidationErrors = {};

    rules.forEach(rule => {
      const value = data[rule.field];
      
      if (rule.required && (!value || value.toString().trim() === '')) {
        newErrors[rule.field] = `${rule.field} is required`;
        return;
      }

      if (value && rule.minLength && value.toString().length < rule.minLength) {
        newErrors[rule.field] = `${rule.field} must be at least ${rule.minLength} characters`;
        return;
      }

      if (value && rule.maxLength && value.toString().length > rule.maxLength) {
        newErrors[rule.field] = `${rule.field} must be no more than ${rule.maxLength} characters`;
        return;
      }

      if (value && rule.pattern && !rule.pattern.test(value.toString())) {
        newErrors[rule.field] = `${rule.field} format is invalid`;
        return;
      }

      if (rule.custom) {
        const customError = rule.custom(value);
        if (customError) {
          newErrors[rule.field] = customError;
          return;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [rules]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  return {
    errors,
    validate,
    clearErrors,
    setFieldError,
    hasErrors: Object.keys(errors).length > 0,
  };
};