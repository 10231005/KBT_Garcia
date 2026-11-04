import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary-700 hover:bg-primary-800 text-white shadow-md hover:shadow-lg focus:ring-primary-500',
    secondary: 'bg-secondary-700 hover:bg-secondary-800 text-white shadow-md hover:shadow-lg focus:ring-secondary-500',
    accent: 'bg-accent-600 hover:bg-accent-700 text-gray-900 shadow-md hover:shadow-lg focus:ring-accent-500',
    outline: 'border-2 border-primary-700 text-primary-700 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'text-gray-700 hover:text-primary-700 hover:bg-gray-100 focus:ring-gray-300',
  };

  const sizes = {
    sm: 'text-sm px-3.5 py-1.5 gap-1.5',
    md: 'text-base px-5 py-2.5 gap-2',
    lg: 'text-lg px-7 py-3 gap-2.5',
  };

  const classes = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}

