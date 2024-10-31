export const schemaValidate = (schema,payload) => {
  console.log(payload);
      try {
        schema.parse(payload);
        return true
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error('something went wrong while parsing')
        }
      }
    
  };