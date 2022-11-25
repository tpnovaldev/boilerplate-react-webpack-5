import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '../../../components';

function SetupTeamModal() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      teams: [{ name: '' }],
    },
  });
  const { fields, remove, prepend } = useFieldArray({
    control,
    name: 'teams',
  });
  const registerSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <>
      <p>
        Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus blandit
      </p>
      <form className="form" onSubmit={handleSubmit(registerSubmit)}>
        <div className="form__group">
          <label htmlFor="teamName" className="form__label">Team name</label>
          <input
            id="teamName"
            className="form__input"
            {...register('team_name')}
            placeholder="Enter team name"
            type="text"
          />
        </div>
        <legend htmlFor="memberName" className="form__label">Team Members</legend>
        <div className="players">
          {fields.map((item, index) => (
            <div key={item.id} className="form__input-group">
              <input
                {...register(`teams[${index}].name`)}
                className="form__input"
                placeholder="Enter player name"
                defaultValue={item.name}
                type="team neam"
              />
              <button className="btn-icon btn--delete" type="button" onClick={() => remove(index)}>
                <img
                  // eslint-disable-next-line max-len
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoOC41MzMzMyw4LjUzMzMzKSI+PHBhdGggZD0iTTEzLDNjLTAuMjY3NTcsLTAuMDAzNjMgLTAuNTI1NDMsMC4xMDAxMiAtMC43MTU5MywwLjI4ODA1Yy0wLjE5MDUsMC4xODc5MyAtMC4yOTc3NCwwLjQ0NDM2IC0wLjI5Nzc0LDAuNzExOTVoLTUuOTg2MzNjLTAuMzYwNjQsLTAuMDA1MSAtMC42OTYwOCwwLjE4NDM4IC0wLjg3Nzg5LDAuNDk1ODdjLTAuMTgxODEsMC4zMTE1IC0wLjE4MTgxLDAuNjk2NzYgMCwxLjAwODI1YzAuMTgxODEsMC4zMTE1IDAuNTE3MjUsMC41MDA5NyAwLjg3Nzg5LDAuNDk1ODdoMThjMC4zNjA2NCwwLjAwNTEgMC42OTYwOCwtMC4xODQzOCAwLjg3Nzg5LC0wLjQ5NTg3YzAuMTgxODEsLTAuMzExNSAwLjE4MTgxLC0wLjY5Njc2IDAsLTEuMDA4MjVjLTAuMTgxODEsLTAuMzExNSAtMC41MTcyNSwtMC41MDA5NyAtMC44Nzc4OSwtMC40OTU4N2gtNS45ODYzM2MwLC0wLjI2NzU5IC0wLjEwNzI0LC0wLjUyNDAzIC0wLjI5Nzc0LC0wLjcxMTk1Yy0wLjE5MDUsLTAuMTg3OTMgLTAuNDQ4MzYsLTAuMjkxNjggLTAuNzE1OTMsLTAuMjg4MDV6TTYsOHYxNmMwLDEuMTA1IDAuODk1LDIgMiwyaDE0YzEuMTA1LDAgMiwtMC44OTUgMiwtMnYtMTZ6Ij48L3BhdGg+PC9nPjwvZz4KPC9zdmc+"
                  alt="svgImg"
                />
              </button>
              <button className="btn-icon btn--add" type="button" onClick={() => prepend({})}>
                <img
                  // eslint-disable-next-line max-len
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMTAuNjY2NjcsMTAuNjY2NjcpIj48cGF0aCBkPSJNMTEsMnY5aC05djJoOXY5aDJ2LTloOXYtMmgtOXYtOXoiPjwvcGF0aD48L2c+PC9nPgo8L3N2Zz4="
                  alt="add icon"
                />
              </button>
            </div>
          ))}
        </div>
        <br />
        <br />
        <br />
        <Button type="submit">
          <span>Save</span>
        </Button>
      </form>
    </>
  )
}

export default SetupTeamModal;
