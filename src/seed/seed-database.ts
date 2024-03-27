import prisma from '../lib/prisma';




async function main() {

  // 1. Borrar registros previos
  // await Promise.all( [


  await prisma.order.deleteMany();



  // ]);
  







  //  Categorias
  // {
  //   name: 'Shirt'
  // }
  

  


  
  

  // Productos

 


  console.log( 'Seed ejecutado correctamente' );
}









( () => {

  if ( process.env.NODE_ENV === 'production' ) return;


  main();
} )();