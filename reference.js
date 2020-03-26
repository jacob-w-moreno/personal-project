edit: (req, res) => {
    let {id} = req.params;
    const {newDate} = req.body;
    const index = progressions.findIndex(goal => goal.id === +id);

    console.log(newDate)
    if (index === -1) res.status(404).send('you suck!')
    progressions[index].date = newDate;
    res.status(200).send(progressions)
}