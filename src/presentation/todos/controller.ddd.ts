import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain';


export class TodosController {

  //* DI
  constructor(
    private readonly todoRepository: TodoRepository,
  ) { }


  public getTodos = async ( req: Request, res: Response ) => {
    const todos = await this.todoRepository.getAll();
    return res.json( todos );
  };

  public getTodoById = async ( req: Request, res: Response ) => {
    const id = +req.params.id;

    try {
      const todo = await this.todoRepository.findById( id );
      res.json( todo );

    } catch ( error ) {
      res.status( 400 ).json( { error } );
    }

  };

  public createTodo = async ( req: Request, res: Response ) => {
    const [ error, createTodoDto ] = CreateTodoDto.create( req.body );
    if ( error ) return res.status( 400 ).json( { error } );

    const todo = await this.todoRepository.create( createTodoDto! );
    res.json( todo );

  };

  public updateTodo = async ( req: Request, res: Response ) => {
    const id = +req.params.id;
    const [ error, updateTodoDto ] = UpdateTodoDto.create( { ...req.body, id } );
    if ( error ) return res.status( 400 ).json( { error } );

    const updatedTodo = await this.todoRepository.updateById( updateTodoDto! );
    return res.json( updatedTodo );

  };


  public deleteTodo = async ( req: Request, res: Response ) => {
    const id = +req.params.id;
    const deletedTodo = await this.todoRepository.deleteById( id );
    res.json( deletedTodo );

  };



}