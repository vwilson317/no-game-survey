package database

import (
	"fmt"
)

func (db Database) RetrieveReminder() []questionSet {

	err := db.SqlDb.PingContext(dbContext)
	if err != nil {
		fmt.Printf("Error: %v", err)
	}

	sqlStatement := fmt.Sprintf("select Id, Name from QuestionSet Order By LastUpdatedUtc desc;")

	data, queryErr := db.SqlDb.QueryContext(dbContext, sqlStatement)
	if queryErr != nil {
		fmt.Printf("Error: %v", queryErr)
	}

	for data.Next() {
		var id, name string

		nErr := data.Scan(&id, &name) //, &alias)
		if nErr != nil {
			//return nErr
			fmt.Printf("Error: %v", nErr)
		}

		fmt.Printf("--> Your QuestionSet: \n \t Id: %v \n \t Name: %v",
			id, name,
		)
		questionSets = append(questionSets, questionSet{ID: id, Name: name})
		//return nil
	}

	return questionSets
}

type questionSet struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

var questionSets = []questionSet{}
