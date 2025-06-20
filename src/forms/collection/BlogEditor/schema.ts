import * as yup from 'yup';
import { titleSchema } from '../commonSchemas';

const blogSchema = yup.object({
  title: titleSchema,
  category: yup.string().nullable(),
  img_src: yup.string().nullable().url('Please enter a valid URL'),
  content: yup.string().required('Content is required')
  .min(10, 'Content must be at least 10 characters')
  .max(500, 'Content must be at most 500 characters'),
  author_id: yup.number().required(), 
});

export default blogSchema;