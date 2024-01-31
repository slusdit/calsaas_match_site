'use client'
import React, { useState } from 'react';
import { Form, FormControl, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button'
import { z, ZodError } from 'zod';

// Define the Teacher type based on the schema
interface Teacher {
  empId?: string;
  credPersonId?: string;
  caltidesNumId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateBirth?: string;
  statusCode?: string;
  seid: string;
}

// Define the validation schema using Zod
const teacherSchema = z.object({
  empId: z.string().optional(),
  credPersonId: z.string().optional(),
  caltidesNumId: z.string(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  dateBirth: z.string().optional(),
  statusCode: z.string().optional(),
  seid: z.string(),
});

const TeacherForm: React.FC = () => {
  const [teacher, setTeacher] = useState<Teacher>({
    empId: '',
    credPersonId: '',
    caltidesNumId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateBirth: '',
    statusCode: '',
    seid: '',
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      teacherSchema.parse(teacher);
      console.log('Form submitted:', teacher);
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        for (const issue of error.issues) {
          newErrors[issue.path[0]] = issue.message;
        }
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTeacher({ ...teacher, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  return (
    <Form  onSubmit={handleSubmit}>
      {/* Repeat the following pattern for each field in your Teacher model */}
      <FormControl id="firstName" isInvalid={!!errors.firstName}>
        <FormLabel>First Name</FormLabel>
        <Input name="firstName" value={teacher.firstName} onChange={handleChange} />
        {errors.firstName && <FormErrorMessage>{errors.firstName}</FormErrorMessage>}
      </FormControl>

      {/* Repeat for other fields... */}

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default TeacherForm;
