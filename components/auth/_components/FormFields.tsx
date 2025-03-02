import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValue } from "@/types";

interface FormFieldsProps {
  fields: Array<FieldValue>;
  form: any;
}
export const FormFields = ({ fields, form }: FormFieldsProps) => {
  return (
    <>
      {fields.map((f: FieldValue) => (
        <FormField
          key={f.name}
          control={form.control}
          name={f.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{f.label}</FormLabel>
              <FormControl>
                <Input type={f.type} placeholder={f.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
};
