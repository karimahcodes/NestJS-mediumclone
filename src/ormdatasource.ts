import { DataSource } from "typeorm";
import ormconfig from '@app/ormconfig';

export default new DataSource(ormconfig);

//this file is necessary for running our migrations