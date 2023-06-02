using System;
using CvCreator.Model.Entities;

namespace CvCreator.Repositories.Abstractions
{
	public interface ICV_ProgrammingLanguageReadRepository : IReadRepository<CV_ProgrammingLanguage>
	{
		IQueryable<CV_ProgrammingLanguage> GetListByIds(List<Guid> ids);
	}
}

